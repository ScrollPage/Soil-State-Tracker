from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework import mixins

from django_filters import rest_framework as filters

from backend.service import PermissionMixin
from detector.models import DetectorData

class PermissionSerializerDetectorViewSet(PermissionMixin,
                                          mixins.RetrieveModelMixin,
                                          mixins.ListModelMixin,
                                          GenericViewSet,
                                        ):
    '''
    Список датчиков и отдельный датчик
    Переопределение определения прав доступа
    '''
    pass

class DetectorDataDateFilter(filters.FilterSet):
	'''Фильтрация данных с датчиков по дате'''
	timestamp = filters.DateRangeFilter()

	class Meta:
		model = DetectorData
		fields = ['timestamp']
