from django.shortcuts import get_object_or_404

import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from chat.models import Chat, Message

class ChatConsumer(WebsocketConsumer):

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def new_message(self, data):
        chat = get_object_or_404(Chat, id=data.pop('chat'))
        message = Message.objects.create(**data, chat=chat)
        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }
        return self.send_chat_message(content)

    def fetch_messages(self, data):
        messages = get_object_or_404(Chat, id=data['chatId']).messages.all()
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message,
    }

    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data.pop('command')](self, data)

    def messages_to_json(self, messages):
        return [self.message_to_json(message) for message in messages]

    def message_to_json(self, message):
        return {
            'id': message.id,
            'full_name': message.full_name,
            'content': message.content,
            'timestamp': str(message.timestamp),
        }

    def send_chat_message(self, message):    
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))