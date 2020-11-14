from django.test import TestCase
from django.urls import reverse, resolve

class TestUrls(TestCase):

    def test_email_activation_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('chat-list')
        self.assertEqual(resolve(path).view_name, 'chat-list')

    def test_activity_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('accept-manager', kwargs={'pk': 1})
        self.assertEqual(resolve(path).view_name, 'accept-manager')