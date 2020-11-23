from mixer.backend.django import mixer
from django.test import TestCase 

class TestModels(TestCase):

    def test_chat_str(self):
        manager = mixer.blend('client.Client', first_name='test', last_name='case')
        chat = mixer.blend('chat.Chat', manager=manager)
        self.assertEqual(str(chat), 'chat with manager case test')

    def test_message_str(self):
        message = mixer.blend('chat.Message', full_name='case test')
        self.assertEqual(str(message), 'case test message')

    def test_chat_notification_str(self):
        manager = mixer.blend('client.Client', first_name='test', last_name='case')
        chat = mixer.blend('chat.Chat', manager=manager)
        notification = mixer.blend('chat.NewChatNotification', chat=chat)
        self.assertEqual(str(notification), f'Notification to {chat}')