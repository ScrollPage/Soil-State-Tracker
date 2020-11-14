from rest_framework import serializers
from rest_framework.authtoken.models import Token

from client.models import Client
from detector.api.serializers import DetectorSerializer

class TokenSerialzizer(serializers.Serializer):
    '''Сериализация ключа токена'''
    
    token = serializers.CharField()

class ClientDetailSerializer(serializers.ModelSerializer):
    '''Детальный клиент'''
    my_detectors = DetectorSerializer(read_only=True, many=True)

    class Meta:
        model = Client
        fields = ['id', 'email', 'first_name', 'last_name', 'my_detectors']

class ClientActivitySerializer(serializers.ModelSerializer):
    '''Сериализация активности контакта'''

    class Meta:
        model = Client
        fields = ['is_active']

class ClientMeSerialzier(serializers.ModelSerializer):
    '''Для сериализации пользователя'''

    class Meta:
        model = Client
        fields = ['id', 'email', 'first_name', 'last_name', 'is_staff']

    def to_representation(self, value):
        res = super().to_representation(value)
        res.update({'is_worker': bool(value.work.all())})
        return res