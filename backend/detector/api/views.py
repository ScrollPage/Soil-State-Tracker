from rest_framework.permissions import IsAuthenticated

from detector.models import Detector
from .service import PermissionSerializerDetectorViewSet
from .serializers import DetectorSerializer
from .permissions import IsRightUser

class DetectorViewSet(PermissionSerializerDetectorViewSet):
    '''Список датчиков и отдельный датчик'''
    
    serializer_class = DetectorSerializer
    permission_classes = [IsAuthenticated]
    permission_classes_by_action = {
        'retrieve': [IsAuthenticated, IsRightUser]
    }

    def get_queryset(self):
        return Detector.objects.filter(user=self.request.user)
