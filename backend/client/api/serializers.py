from rest_framework import serializers
from rest_framework.authtoken.models import Token

class TokenSerialzizer(serializers.Serializer):
    '''Сериализация ключа токена'''
    
    token = serializers.CharField()