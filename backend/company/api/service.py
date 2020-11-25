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

def join_qs(queryset, objects):
    return queryset.join(objects)

def get_detectors_out_of_company_qs(queryset):
    try:
        detectors_queryset = queryset.first().detectors.all()
    except AttributeError:
        return Detector.objects.none()
    list(map(lambda company: join_qs(detectors_queryset, company.detectors.all()), queryset[1:]))
    return detectors_queryset