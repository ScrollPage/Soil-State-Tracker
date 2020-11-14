from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path

from .views import ChatViewSet, ChatNotificationsListView

urlpatterns = [
    path('notifications/', ChatNotificationsListView.as_view(), name='notifications')
]

accept_manager = ChatViewSet.as_view({
    'post': 'accept_manager',
})

chat = ChatViewSet.as_view({
    'post': 'create',
    'get': 'list'
})

urlpatterns += format_suffix_patterns([
    path('chat/', chat, name='chat-list'),
    path('chat/<int:pk>/', accept_manager, name='accept-manager'),
])