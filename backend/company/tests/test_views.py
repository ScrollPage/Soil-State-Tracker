from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from django.conf import settings

import json

from client.models import Client
from company.models import Company
from backend.service import get_response

class TestViews(APITestCase):

    def setUp(self):
        self.user1 = Client.objects.create_user(
            email='test@case1.test',
            first_name='test',
            last_name='test',
            password='very_strong_psw'
        )

        self.user2 = Client.objects.create_user(
            email='test@case2.test',
            first_name='test',
            last_name='test',
            password='very_strong_psw'
        )

        Company.objects.create(admin=self.user1, name='test')

    def test_company_list_unauth(self):
        response = get_response('company-list', 'get')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_company_list_auth(self):
        response = get_response('company-list', 'get', self.user1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_update_by_admin(self):
        response = get_response('company-detail', 'patch', self.user1, {'name': 'Test'}, {'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content)['name'], 'Test')

    def test_update_by_random(self):
        response = get_response('company-detail', 'patch', self.user2, {'name': 'Test'}, {'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_by_admin(self):
        response = get_response('company-detail', 'delete', self.user1, kwargs={'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_by_random(self):
        response = get_response('company-detail', 'delete', self.user2, kwargs={'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)