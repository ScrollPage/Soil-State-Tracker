from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q, Count

from company.models import Company
from detector.models import Detector
from .service import PermissionSerializerModelViewSet, get_company_or_404
from .serializers import (
    CompanySerializer, 
    CompanyUpdateSerializer,
    RemoveDetectorsSerializer,
    AddDetectorsSerialzier
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
        'add_detectors': AddDetectorsSerialzier,
        'remove_detectors': RemoveDetectorsSerializer,
    }
    permission_classes = [IsAuthenticated, IsAdmin]
    permission_classes_by_action = {
        'create': [IsAuthenticated],
        'retirieve': [IsAuthenticated],
        'list': [IsAuthenticated]
    }

    def get_queryset(self):
        return Company.objects.filter(admin=self.request.user).annotate(
            is_admin=Count('admin', filter=Q(admin=self.request.user))
        )

    def perform_create(self, serializer):
        serializer.save(admin=self.request.user)

    @action(detail=False, methods=['get'])
    def workers(self, request, *args, **kwargs):
        pk = kwargs['pk']
        company = get_company_or_404(self.get_queryset(), pk)
        workers = company.workers.all()
        serializer = self.get_serializer(workers, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def detectors(self, request, *args, **kwargs):
        pk = kwargs['pk']
        company = get_company_or_404(self.get_queryset(), pk)
        detectors = company.detectors.all()
        serializer = self.get_serializer(detectors, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def detectors_to_transfer(self, request, *args, **kwargs):
        pk = kwargs['pk']
        company = get_company_or_404(self.get_queryset(), pk)
        detectors = company.detectors.filter(user=None)
        serializer = self.get_serializer(detectors, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def add_detectors(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        pk = kwargs['pk']
        company = get_company_or_404(self.get_queryset(), pk)
        worker = company.get_worker(serializer.data['id'])
        detectors = company.no_user_detectors().filter(id__in=serializer.data['detectors'])
        detectors.update(user=worker)
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def remove_detectors(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        pk = kwargs['pk']
        company = get_company_or_404(self.get_queryset(), pk)
        detectors = company.no_user_detectors().filter(id__in=serializer.data['detectors'])
        detectors.update(user=None)
        return Response(status=status.HTTP_200_OK)