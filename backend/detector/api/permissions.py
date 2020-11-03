from rest_framework.permissions import BasePermission

class IsRightUser(BasePermission):
    '''Тот ли пользователь'''
    def has_object_permissionZ(self, request, view, obj):
        return obj.user == request.user