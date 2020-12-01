from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Q, Count, Prefetch

from cacheops import cached_as

from company.models import Company
from detector.models import Detector
from .service import PermissionSerializerModelViewSet, get_detectors_out_of_company_qs
from .serializers import (
    CompanySerializer, 
    CompanyUpdateSerializer,
    RemoveDetectorsSerializer,
    AddDetectorsSerializer
)
from client.api.serializers import ClientDetailSerializer
from detector.api.serializers import DetectorSerializer
from .permissions import IsAdmin

class CompanyViewSet(PermissionSerializerModelViewSet):
    '''Все о компаниях'''

    serializer_class = CompanySerializer
    serializer_class_by_action = {
        'update': CompanyUpdateSerializer,
        'partial_update': CompanyUpdateSerializer,
        'workers': ClientDetailSerializer,
        'detectors': DetectorSerializer,
        'detectors_to_transfer': DetectorSerializer,
        'add_detectors': AddDetectorsSerializer,
        'remove_detectors': RemoveDetectorsSerializer,
    }
    permission_classes = [IsAuthenticated, IsAdmin]
    permission_classes_by_action = {
        'create': [IsAuthenticated],
        'retrieve': [IsAuthenticated],
        'list': [IsAuthenticated]
    }

    def get_queryset(self):
        companies = Company.objects.filter(admin=self.request.user) \
            .prefetch_related(
                Prefetch(
                    'detectors',
                    queryset=Detector.objects.all().only('user__id')
                )
            )

        @cached_as(companies, get_detectors_out_of_company_qs(companies))
        def _annotate_companies(companies=companies):
            return companies \
                .annotate(overall_detectors=Count('detectors', distinct=True)) \
                .annotate(free_detectors=Count('detectors', filter=Q(detectors__user__id=None), distinct=True))

        return _annotate_companies()

    def perform_create(self, serializer):
        serializer.save(admin=self.request.user)

    @action(detail=False, methods=['get'])
    def workers(self, request, *args, **kwargs):
        company = self.get_object()
        workers = company.workers.all()

        @cached_as(company.detectors.all(), workers)
        def _get_workers(workers=workers):
            return workers \
                .prefetch_related(
                    Prefetch(
                        'my_detectors',
                        queryset=Detector.objects.all().only(
                            'id',
                            'x',
                            'y'
                        )
                    )
                )
                
        serializer = self.get_serializer(_get_workers(), many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def detectors(self, request, *args, **kwargs):
        company = self.get_object()
        detectors = company.detectors.all()
        serializer = self.get_serializer(detectors, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def detectors_to_transfer(self, request, *args, **kwargs):
        company = self.get_object()
        detectors = company.detectors.filter(user=None)
        serializer = self.get_serializer(detectors, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def add_detectors(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        company = self.get_object()
        worker = company.get_worker(serializer.data['id'])
        detectors = company.no_user_detectors().filter(id__in=serializer.data['detectors'])
        # list(map(lambda detector: detector.set_user(worker), detectors))
        detectors.update(user=worker)
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def remove_detectors(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        company = self.get_object()
        detectors = company.detectors.filter(id__in=serializer.data['detectors'])
        # list(map(lambda detector: detector.set_user(None), detectors))
        detectors.update(user=None)
        return Response(status=status.HTTP_200_OK)