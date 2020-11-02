from rest_framework import serializers

from company.models import Company
from client.api.serializers import ClientDetailSerializer

class CompanySerializer(serializers.ModelSerializer):
    '''Создание компании'''
    workers = ClientDetailSerializer(many=True, read_only=True)
    admin = ClientDetailSerializer(read_only=True)
    is_admin = serializers.BooleanField(read_only=True)

    class Meta:
        model = Company
        fields = '__all__'

class CompanyUpdateSerializer(serializers.ModelSerializer):
    '''Обновление информации о компании'''

    class Meta:
        model = Company
        fields = ['name', 'url']

