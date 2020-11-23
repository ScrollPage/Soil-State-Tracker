from rest_framework.permissions import BasePermission

class IsStaff(BasePermission):
    '''Явkяется ли мэнэджером'''

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return request.user.is_staff
        return False

class NoManager(BasePermission):
    '''Нет ли менеджера'''

    def has_object_permission(self, request, view, obj):
        return not obj.manager

class CorrectManager(BasePermission):
    '''Правильный менеджер'''

    def has_object_permission(self, request, view, obj):
        return request.user == obj.manager