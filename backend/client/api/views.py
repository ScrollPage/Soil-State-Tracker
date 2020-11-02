from rest_framework.viewsets import GenericViewSet
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .serializers import TokenSerialzizer, ClientActivitySerializer
from .service import SerializerRetrieveViewSet
from client.models import Client

class ClientActivity(SerializerRetrieveViewSet):
    '''Активация аккаунта'''

    queryset = Client.objects.all()
    serializer_class = TokenSerialzizer
    serializer_class_by_action = {
        'retrieve': ClientActivitySerializer
    }
    permission_classes = [permissions.AllowAny]
    lookup_field = 'email'

    @action(detail=False, methods=['post'])
    def activate(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        key = serializer.data.get('token')
        token = get_object_or_404(Token, key=key)
        user = token.user
        user.is_active = True
        user.save()
        token.delete()
        return Response(status=status.HTTP_200_OK)