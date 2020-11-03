from django.test import TestCase
from django.urls import reverse, resolve

class TestUrls(TestCase):

    def test_company_list_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('company-list')
        self.assertEqual(resolve(path).view_name, 'company-list')

    def test_company_detail_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('company-detail', kwargs={'pk': 1})
        self.assertEqual(resolve(path).view_name, 'company-detail')

    def test_company_workers_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('workers-list', kwargs={'pk': 1})
        self.assertEqual(resolve(path).view_name, 'workers-list')

    def test_company_detectors_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('detectors-list', kwargs={'pk': 1})
        self.assertEqual(resolve(path).view_name, 'detectors-list')

    def test_company_transfer_detectors_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('detectors-transfer-list', kwargs={'pk': 1})
        self.assertEqual(resolve(path).view_name, 'detectors-transfer-list')

    def test_company_add_detectors_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('add-detectors', kwargs={'pk': 1})
        self.assertEqual(resolve(path).view_name, 'add-detectors')

    def test_company_remove_detectors_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('remove-detectors', kwargs={'pk': 1})
        self.assertEqual(resolve(path).view_name, 'remove-detectors')