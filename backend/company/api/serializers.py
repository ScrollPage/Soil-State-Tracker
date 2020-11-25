from rest_framework import serializers

from company.models import Company
from client.api.serializers import ClientDetailSerializer

class CompanySerializer(serializers.ModelSerializer):
    '''Создание компании'''
    overall_detectors = serializers.IntegerField(read_only=True)
    free_detectors = serializers.IntegerField(read_only=True)

    class Meta:
        model = Company
        exclude = ['workers', 'admin']

class CompanyUpdateSerializer(serializers.ModelSerializer):
    '''Обновление информации о компании'''

    class Meta:
        model = Company
        fields = ['name', 'url', 'info']

class RemoveDetectorsSerializer(serializers.Serializer):
    '''Сериалзация списка идентификаторов'''
    detectors = serializers.ListField()

class AddDetectorsSerializer(RemoveDetectorsSerializer):
    '''Сериализация списка идентификаторов и пользователя'''
    id = serializers.IntegerField()