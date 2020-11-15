from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import QueryDict

from detector.models import Detector, DetectorData
from .service import PermissionSerializerDetectorViewSet, DetectorDataFilterSet
from .serializers import DetectorSerializer, DetectorDataSerializer

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
    serializer_class = DetectorDataSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return DetectorData.objects.filter(user=self.request.user)

    def get_detector(self):
        detector = get_object_or_404(Detector, id=self.kwargs['pk'])
        self.check_object_permissions(self.request, detector)
        return detector

    def get_query_params(self):
        res = ''
        for k, v in self.request.query_params.items():
            res += f'{k}={v}&'
        return QueryDict(res)

    def list(self, request, *args, **kwargs):
        detector = self.get_detector()
        query = self.get_query_params()
        data = self.get_queryset().filter(detector=detector)
        data = DetectorDataFilterSet(data=query, queryset=data).filter()
        serializer = self.get_serializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)