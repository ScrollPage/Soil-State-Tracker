from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Q, Count, Prefetch

from cacheops import cached_as

from company.models import Company
from detector.models import Detector
from .service import PermissionSerializerModelViewSet
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
        queryset = Company.objects.filter(admin=self.request.user)

        @cached_as(queryset)
        def _annotate_company(queryset=queryset):
            return queryset \
                .select_related('admin') \
                .annotate(is_admin=Count('admin', filter=Q(admin__id=self.request.user.id)))

        return _annotate_company()

    def perform_create(self, serializer):
        serializer.save(admin=self.request.user)

    @action(detail=False, methods=['get'])
    def workers(self, request, *args, **kwargs):
        queryset = self.get_object().workers.all()

        @cached_as(queryset)
        def _get_workers(queryset=queryset):
            return queryset \
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
        detectors.update(user=worker)
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def remove_detectors(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        company = self.get_object()
        detectors = company.detectors.filter(id__in=serializer.data['detectors'])
        detectors.update(user=None)
        return Response(status=status.HTTP_200_OK)