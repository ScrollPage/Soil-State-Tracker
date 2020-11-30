from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import NotFound

from backend.service import PermissionSerializerMixin
from company.models import Company
from detector.models import Detector

class PermissionSerializerModelViewSet(PermissionSerializerMixin, ModelViewSet):
    '''
    Модельный вью-сет 
    Переопределены определения сериализатора и прав доступа
    '''
    pass

def concatenate_qs(queryset, objects):
    queryset |= objects
    return queryset

def get_detectors_out_of_company_qs(queryset):
    detectors = Detector.objects.none()
    list(map(lambda company: concatenate_qs(detectors, company.detectors.all()), queryset))
    return detectors