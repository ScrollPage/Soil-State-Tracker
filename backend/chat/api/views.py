from rest_framework import permissions, status, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.db.models import Q, Count, Prefetch

from cacheops import cached_as

from .service import PermissionSerializerListCreateViewSet
from chat.models import Chat, NewChatNotification, Message
from .permissions import IsStaff, NoManager, CorrectManager
from .serializers import ChatSerializer, NewChatNotificationSerializer

class ChatViewSet(PermissionSerializerListCreateViewSet):
    '''
    Список чатов
    Создание Чата
    Принятие чата менеджером
    Прочтение сообщений
    '''
 
    serializer_class = ChatSerializer
    permission_classes = [IsStaff]
    permission_classes_by_action = {
        'create': [permissions.AllowAny],
        'accept_manager': [IsStaff, NoManager],
        'read_messages': [CorrectManager],
        'retrieve': [CorrectManager],
    }

    def get_queryset(self):
        if self.action == 'accept_manager':
            return Chat.objects.filter(manager=None)
        elif self.action == 'read_messages':
            return Chat.objects.filter(manager=self.request.user)
        else:
            queryset = Chat.objects.filter(manager=self.request.user) \
                .prefetch_related(
                    Prefetch(
                        'messages',
                        queryset=Message.objects.only('is_read').all()
                    )
                ) \
                .annotate(is_read=Count('messages', filter=Q(messages__is_read=False)))

            return queryset

    def perform_create(self, serializer):
        serializer.save(user_name=str(self.request.user))

    @action(detail=False, methods=['post'])
    def accept_manager(self, request, *args, **kwargs):
        chat = self.get_object()
        chat.manager = request.user
        chat.save()
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['put'])
    def read_messages(self, request, *args, **kwargs):
        chat = self.get_object()
        chat.messages.filter(is_read=False).update(is_read=True)
        return Response(status=status.HTTP_200_OK)

class ChatNotificationsListView(generics.ListAPIView):
    '''Список уведомлений о новых чатах'''
    queryset = NewChatNotification.objects.all()
    serializer_class = NewChatNotificationSerializer
    permission_classes = [IsStaff]