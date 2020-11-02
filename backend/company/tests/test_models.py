from mixer.backend.django import mixer
from django.test import TestCase 

class TestModels(TestCase):

    def test_client_full_name(self):
        company = mixer.blend('company.Company', name='test')
        self.assertEqual(str(company), 'company test')