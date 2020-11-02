from django.test import TestCase
from django.urls import reverse, resolve

class TestUrls(TestCase):

    def test_email_activation_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('company-list')
        self.assertEqual(resolve(path).view_name, 'company-list')

    def test_email_activation_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('company-detail', kwargs={'pk': 1})
        self.assertEqual(resolve(path).view_name, 'company-detail')