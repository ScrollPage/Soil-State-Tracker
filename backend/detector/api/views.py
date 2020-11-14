from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from django_filters.rest_framework import DjangoFilterBackend

from detector.models import Detector, DetectorData
from .service import PermissionSerializerDetectorViewSet, DetectorDataDateFilter
from .serializers import DetectorSerializer, DetectorDataSerializer
from .permissions import DetectorOwner

class DetectorViewSet(PermissionSerializerDetectorViewSet):
    '''Список датчиков и отдельный датчик'''
    
    serializer_class = DetectorSerializer
    permission_classes = [IsAuthenticated]
    permission_classes_by_action = {
        'retrieve': [IsAuthenticated]
    }

    def get_queryset(self):
        return Detector.objects.filter(user=self.request.user)

class DetectorDataView(generics.ListAPIView):
    '''Список данных датчиков'''
    queryset = DetectorData.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = DetectorDataDateFilter
    serializer_class = DetectorDataSerializer
    permission_classes = [permissions.IsAuthenticated, DetectorOwner]

    def get_detector(self):
        detector = get_object_or_404(Detector, id=self.kwargs['pk'])
        self.check_object_permissions(self.request, detector)
        return detector

    def list(self, request, *args, **kwargs):
        detector = self.get_detector()
        data = DetectorData.objects.filter(detector=detector)
        serializer = self.get_serializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)