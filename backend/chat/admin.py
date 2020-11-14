from django.contrib import admin

from .models import Chat, Message, NewChatNotification

admin.site.register(NewChatNotification)
admin.site.register(Chat)
admin.site.register(Message)