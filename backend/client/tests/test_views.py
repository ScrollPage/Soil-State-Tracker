from rest_framework import status
from rest_framework.authtoken.models import Token
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
            password='very_strong_psw'
        )

    def test_activation(self):
        key = Token.objects.get(user=self.user1)
        response = get_response('activate', 'post', data={'token': key})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_activation_wrong_key(self):
        key = Token.objects.get(user=self.user1)
        response = get_response('activate', 'post', data={'token': 1})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_activity_active(self):
        response = get_response('check-activity', 'get', kwargs={'email': 'test@case1.test'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['is_active'], False)

    def test_activity_not_active(self):
        self.user1.is_active = True
        self.user1.save()
        response = get_response('check-activity', 'get', kwargs={'email': 'test@case1.test'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['is_active'], True)