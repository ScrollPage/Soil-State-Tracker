from rest_framework import serializers
from rest_framework.authtoken.models import Token

from client.models import Client

class TokenSerialzizer(serializers.Serializer):
    '''Сериализация ключа токена'''
    
    token = serializers.CharField()

class ClientDetailSerializer(serializers.ModelSerializer):
    '''Детальный клиент'''

    class Meta:
        model = Client
        fields = ['email', 'first_name', 'last_name', 'is_superuser']