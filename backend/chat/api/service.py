from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from django.forms.models import model_to_dict

from backend.service import PermissionMixin
from client.models import Client

class PermissionSerializerListCreateViewSet(PermissionMixin,
                                            GenericViewSet,
                                            mixins.CreateModelMixin,
                                            mixins.ListModelMixin,
                                            mixins.DestroyModelMixin,
                                            mixins.RetrieveModelMixin,
                                        ):
    '''
    Список, создание, отдельный элемент
    Переопредлены определения прав доступа и класса сериализатора
    '''
    pass

def model_to_dict_with_none(instance):
    if instance:
        return model_to_dict(instance)
    else: 
        return None