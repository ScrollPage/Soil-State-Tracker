from rest_framework.test import APIClient
from django.urls import reverse

def get_response(url, method, user=None, data=None, kwargs=None, is_url=False, format=None):
    client = APIClient()

    if user:
        client.force_authenticate(user)

    if not is_url:
        url = reverse(url, kwargs=kwargs)

    method_dict = {
        'post': client.post,
        'get': client.get,
        'patch': client.patch,
        'delete': client.delete,
        'put': client.put
    }
    return method_dict[method](url, data, format=format)

class PermissionMixin:
    '''Mixin permission для action'''
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]] 
        except KeyError:
            return [permission() for permission in self.permission_classes]

class SerializerMixin:
    '''Класс сериализатора в зависимости от action'''
    def get_serializer_class(self):
        try:
            return self.serializer_class_by_action[self.action]
        except KeyError:
            return self.serializer_class

class PermissionSerializerMixin(PermissionMixin, SerializerMixin):
    '''Доп классы'''
    pass