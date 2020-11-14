from rest_framework import status
from rest_framework.test import APITestCase
from django.conf import settings

from client.models import Client
from backend.service import get_response

class TestViews(APITestCase):

    def setUp(self):
        self.user1 = Client.objects.create_user(
            email='test@case1.test',
            first_name='admin',
            last_name='admin',
            password='very_strong_psw',
            is_staff=True,
        )

        self.user2 = Client.objects.create_user(
            email='test@case1.test',
            first_name='admin',
            last_name='admin',
            password='very_strong_psw',
        )

    def test_chat_creation(self):
        response = get_response('post', 'chat')
        self.assertEqual(response.status_code, status.HTTP_200_OK)