from rest_framework.permissions import BasePermission

class DetectorOwner(BasePermission):
    '''Владеет ли он датчиком'''
    def has_object_permission(self, request, view, obj):
        return obj in request.user.my_detectors.all()