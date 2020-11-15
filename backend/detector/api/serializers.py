from rest_framework import serializers

from detector.models import Detector, DetectorData

class DetectorSerializer(serializers.ModelSerializer):
    '''Сериализация датчика'''

    class Meta:
        model = Detector
        exclude = ['company', 'user']

class DetectorDataSerializer(serializers.ModelSerializer) :
    '''Сериализация данных с датчика'''
    
    class Meta:
        model = DetectorData
        exclude = ['detector', 'company', 'user']

