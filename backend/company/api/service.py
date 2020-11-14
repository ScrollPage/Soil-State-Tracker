from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import NotFound

from backend.service import PermissionSerializerMixin
from company.models import Company

class PermissionSerializerModelViewSet(PermissionSerializerMixin, ModelViewSet):
    '''
    Модельный вью-сет 
    Переопределены определения сериализатора и прав доступа
    '''
    pass