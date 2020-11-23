from rest_framework import serializers

from .service import model_to_dict_with_none
from chat.models import Chat, NewChatNotification

class ChatSerializer(serializers.ModelSerializer):
    '''Сериализация чата'''
    id = serializers.IntegerField(read_only=True)
    manager = serializers.CharField(read_only=True)
    user_name = serializers.CharField(read_only=True)
    is_read = serializers.BooleanField(read_only=True)

    class Meta:
        model = Chat
        fields = ['id', 'manager', 'user_name', 'is_read']

    def to_representation(self, value):
        res = super().to_representation(value)
        last_message = value.messages.last()
        last_message = model_to_dict_with_none(last_message)
        res.update({'last_message': last_message})
        return res

class NewChatNotificationSerializer(serializers.ModelSerializer):
    '''Сериализация уведомлений о новых чатах'''
    
    class Meta:
        model = NewChatNotification
        fields = '__all__'