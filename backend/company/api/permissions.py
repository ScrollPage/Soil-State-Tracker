from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    '''Админ ли группы'''
    def has_object_permission(self, request, view, obj):
        return request.user == obj.admin