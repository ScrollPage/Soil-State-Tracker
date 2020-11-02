from rest_framework.permissions import IsAuthenticated

from company.models import Company
from .service import PermissionSerializerModelViewSet
from .serializers import (
    CompanySerializer, 
    CompanyUpdateSerializer
)
from .permissions import IsAdmin

class CompanyViewSet(PermissionSerializerModelViewSet):
    '''Все о компаниях'''
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    serializer_class_by_action = {
        'update': CompanyUpdateSerializer,
        'partial_update': CompanyUpdateSerializer
    }
    permission_classes = [IsAuthenticated, IsAdmin]
    permission_classes_by_action = {
        'create': [IsAuthenticated],
        'retirieve': [IsAuthenticated],
        'list': [IsAuthenticated]
    }

    def perform_create(self, serializer):
        serializer.save(admin=self.request.user)