from mixer.backend.django import mixer
from django.test import TestCase 

from django.test import override_settings

class TestModels(TestCase):

    @override_settings(CACHEOPS_ENABLED=False)
    def test_client_full_name(self):
        company = mixer.blend('company.Company', name='test')
        self.assertEqual(str(company), 'company test')