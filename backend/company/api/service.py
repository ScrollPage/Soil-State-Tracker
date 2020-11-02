from rest_framework.viewsets import ModelViewSet

from backend.service import PermissionSerializerMixin

class PermissionSerializerModelViewSet(ModelViewSet, PermissionSerializerMixin):
    '''
    Модельный вью-сет 
    Переопределены определения сериализатора и прав доступа
    '''
    pass