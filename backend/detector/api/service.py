from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework import mixins

from backend.service import PermissionMixin

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