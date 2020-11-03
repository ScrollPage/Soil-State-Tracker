from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from django.conf import settings

import json

from client.models import Client
from company.models import Company
from detector.models import Detector
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

        self.company = Company.objects.create(admin=self.user1, name='test')
        self.company.workers.add(self.user2)
        Detector.objects.create(x=0, y=0, company=self.company, user=self.user2)
        Detector.objects.create(x=0, y=0, company=self.company, user=None)

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
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_by_admin(self):
        response = get_response('company-detail', 'delete', self.user1, kwargs={'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_by_random(self):
        response = get_response('company-detail', 'delete', self.user2, kwargs={'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_workers_list_by_admin(self):
        response = get_response('workers-list', 'get', self.user1, kwargs={'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_detectors_list_by_admin(self):
        response = get_response('detectors-list', 'get', self.user1, kwargs={'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_transfer_detectors_list_by_admin(self):
        response = get_response('detectors-transfer-list', 'get', self.user1, kwargs={'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_workers_list_by_random(self):
        response = get_response('workers-list', 'get', self.user2, kwargs={'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_add_detectors_by_admin(self):
        response = get_response('add-detectors', 'post', self.user1, {'detectors': [2], 'id': 2}, {'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_remove_detectors_by_admin(self):
        response = get_response('remove-detectors', 'post', self.user1, {'detectors': [1]}, {'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_remove_detectors_by_random(self):
        response = get_response('remove-detectors', 'post', self.user2, {'detectors': [1]}, {'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_remove_detectors_by_admin_bad_request(self):
        response = get_response('remove-detectors', 'post', self.user1, kwargs={'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)