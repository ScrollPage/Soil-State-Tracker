from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import NotFound

from backend.service import PermissionSerializerMixin
from company.models import Company

class PermissionSerializerModelViewSet(PermissionSerializerMixin, ModelViewSet):
    '''
    Модельный вью-сет 
    Переопределены определения сериализатора и прав доступа
    '''
    pass

def get_company_or_404(queryset, pk):
    try:
        company = queryset.get(id=pk)
    except Company.DoesNotExist:
        raise NotFound("You don't own such a company.")
    return company