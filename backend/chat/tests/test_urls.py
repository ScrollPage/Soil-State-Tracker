from django.test import TestCase
from django.urls import reverse, resolve

class TestUrls(TestCase):

    def test_chat_list_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('chat-list')
        self.assertEqual(resolve(path).view_name, 'chat-list')

    def test_accept_manager_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('accept-manager-read-messages', kwargs={'pk': 1})
        self.assertEqual(resolve(path).view_name, 'accept-manager-read-messages')

    def test_notifications_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('notifications')
        self.assertEqual(resolve(path).view_name, 'notifications')