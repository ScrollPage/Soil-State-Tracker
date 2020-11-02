from rest_framework.permissions import IsAuthenticated
from django.db.models import Q, Count

from company.models import Company
from .service import PermissionSerializerModelViewSet
from .serializers import (
    CompanySerializer, 
    CompanyUpdateSerializer
)
from .permissions import IsAdmin

class CompanyViewSet(PermissionSerializerModelViewSet):
    '''Все о компаниях'''
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

    def get_queryset(self):
        return Company.objects.all().annotate(
            is_admin=Count('admin', filter=Q(admin=self.request.user))
        )

    def perform_create(self, serializer):
        serializer.save(admin=self.request.user)