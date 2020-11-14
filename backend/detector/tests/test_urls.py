from django.test import TestCase
from django.urls import reverse, resolve

class TestUrls(TestCase):

	def test_detector_list_url(self):
		'''Убедиться, что ссылка и вью связаны правильно'''
		path = reverse('detector-list')
		self.assertEqual(resolve(path).view_name, 'detector-list')

	def test_detector_detail_url(self):
		'''Убедиться, что ссылка и вью связаны правильно'''
		path = reverse('detector-detail', kwargs={'pk': 1})
		self.assertEqual(resolve(path).view_name, 'detector-detail')

	def test_detector_data_list(self):
		'''Убедиться, что ссылка и вью связаны правильно'''
		path = reverse('detector-data-list', kwargs={'pk': 1})
		self.assertEqual(resolve(path).view_name, 'detector-data-list')