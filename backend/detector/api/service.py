from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework import mixins

from url_filter.filtersets import ModelFilterSet

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

class DetectorDataFilterSet(ModelFilterSet):
	'''Фильтрация данных с датчиков'''
	class Meta:
		model = DetectorData
		fields = ['timestamp']