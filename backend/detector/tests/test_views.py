from rest_framework import status
from rest_framework.test import APITestCase
from django.conf import settings

from client.models import Client
from detector.models import Detector, DetectorData 
from backend.service import get_response

class TestViews(APITestCase):

	def setUp(self):
		self.user1 = Client.objects.create_superuser(
			email='test@case1.test',
			first_name='admin',
			last_name='admin',
			password='very_strong_psw',
		)

		detector = Detector.objects.create(user=self.user1, x=0, y=0)
		DetectorData.objects.create(
			detector=detector,
			first_temp=10,
			second_temp=10,
			third_temp=10,
			lightning=10,
			humidity=10,
			pH=10
		)

		self.user2 = Client.objects.create_user(
			email='test@case2.test',
			first_name='admin',
			last_name='admin',
			password='very_strong_psw',
		)

	def test_detectors_list_unauth(self):
		response = get_response('detector-list', 'get')
		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

	def test_detectors_list_auth_no_detectors(self):
		response = get_response('detector-list', 'get', self.user2)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(len(response.data), 0)

	def test_detectors_list_auth_no_detectors(self):
		response = get_response('detector-list', 'get', self.user1)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(len(response.data), 1)

	def test_detectors_detail_wrong_user(self):
		response = get_response('detector-detail', 'get', self.user2, kwargs={'pk': 1})
		self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

	def test_detectors_detail(self):
		response = get_response('detector-detail', 'get', self.user1, kwargs={'pk': 1})
		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def test_detector_data_list_wrong_user(self):
		response = get_response('detector-data-list', 'get', self.user2, kwargs={'pk': 1})
		self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

	def test_detector_data_list(self):
		response = get_response('detector-data-list', 'get', self.user1, kwargs={'pk': 1})
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(len(response.data), 1)
		self.assertEqual(response.data[0]['pH'], 10.00)
