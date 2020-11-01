from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from.serializers import TokenSerialzizer

class ClientActivation(APIView):
    '''Активация аккаунта'''

    serializer_class = TokenSerialzizer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        key = serializer.data.get('token')
        token = get_object_or_404(Token, key=key)
        user = token.user
        user.is_active = True
        user.save()
        token.delete()
        return Response(status=status.HTTP_200_OK)