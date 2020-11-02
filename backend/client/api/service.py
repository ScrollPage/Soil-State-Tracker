from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins

from backend.service import SerializerMixin

class SerializerRetrieveViewSet(SerializerMixin,
                                GenericViewSet,
                                mixins.RetrieveModelMixin
                            ):
    '''
    Обзор юзера
    Преопределено получение сериализатора
    '''
    pass