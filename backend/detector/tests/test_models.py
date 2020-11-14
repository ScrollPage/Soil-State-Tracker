from mixer.backend.django import mixer
from django.test import TestCase 

import datetime as dt

class TestModels(TestCase):

	def test_detector_str(self):
		company = mixer.blend('company.Company', name='test')
		detector = mixer.blend('detector.Detector', company=company)
		self.assertEqual(str(detector), 'detector 1 that belongs to company test')