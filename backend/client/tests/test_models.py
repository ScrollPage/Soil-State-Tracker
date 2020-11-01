from mixer.backend.django import mixer
from django.test import TestCase 

class TestModels(TestCase):

    def test_client_str(self):
        client = mixer.blend('client.Client')
        self.assertEqual(str(client), '1')

    def test_client_full_name(self):
        client = mixer.blend('client.Client', first_name='test', last_name='case')
        self.assertEqual(client.get_full_name(), 'test case')