from rest_framework import permissions, status, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404

from .service import PermissionSerializerListCreateViewSet
from chat.models import Chat, NewChatNotification
from .permissions import IsStaff, NoManager
from .serializers import ChatSerializer, NewChatNotificationSerializer

class ChatViewSet(PermissionSerializerListCreateViewSet):
    '''
    Список чатов
    Создание Чата
    Принятие чата менеджером
    '''

    serializer_class = ChatSerializer
    permission_classes = [IsStaff]
    permission_classes_by_action = {
        'create': [permissions.AllowAny],
        'accept_manager': [IsStaff, NoManager],
    }

    def get_queryset(self):
        if self.action == 'list':
            return Chat.objects.filter(manager=self.request.user)
        elif self.action == 'accept_manager':
            return Chat.objects.all()

    def perform_create(self, serializer):
        serializer.save(user_name=str(self.request.user))

    @action(detail=False, methods=['post'])
    def accept_manager(self, request, *args, **kwargs):
        chat = self.get_object()
        NewChatNotification.objects.get(chat=chat).delete()
        chat.manager = request.user
        chat.save()
        return Response(status=status.HTTP_200_OK)

class ChatNotificationsListView(generics.ListAPIView):
    '''Список уведомлений о новых чатах'''
    queryset = NewChatNotification.objects.all()
    serializer_class = NewChatNotificationSerializer
    permission_classes = [IsStaff]