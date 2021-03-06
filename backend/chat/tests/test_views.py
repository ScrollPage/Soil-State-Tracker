from rest_framework import status
from rest_framework.test import APITestCase
from django.conf import settings

from django.test import override_settings

from client.models import Client
from chat.models import Chat
from backend.service import get_response

class TestViews(APITestCase):

    def setUp(self):
        self.user1 = Client.objects.create_superuser(
            email='test@case1.test',
            first_name='admin',
            last_name='admin',
            password='very_strong_psw',
        )

        self.chat1 = Chat.objects.create(manager=self.user1, user_name='case test 1')

        self.user2 = Client.objects.create_user(
            email='test@case2.test',
            first_name='admin',
            last_name='admin',
            password='very_strong_psw',
        )

        self.user3 = Client.objects.create_superuser(
            email='test@case3.test',
            first_name='admin',
            last_name='admin',
            password='very_strong_psw',
        )

        self.chat2 = Chat.objects.create()

    @override_settings(CACHEOPS_ENABLED=False)
    def test_chat_creation(self):
        response = get_response('chat-list', 'post')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    @override_settings(CACHEOPS_ENABLED=False)
    def test_chat_list_not_unauth(self):
        response = get_response('chat-list', 'get')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    @override_settings(CACHEOPS_ENABLED=False)
    def test_chat_list_not_manager(self):
        response = get_response('chat-list', 'get', self.user2)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    @override_settings(CACHEOPS_ENABLED=False)
    def test_chat_list_manager(self):
        response = get_response('chat-list', 'get', self.user1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['user_name'], 'case test 1')

    @override_settings(CACHEOPS_ENABLED=False)
    def test_accept_manager_already_accepted(self):
        response = get_response('accept-manager-read-messages', 'post', self.user3, kwargs={'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    @override_settings(CACHEOPS_ENABLED=False)
    def test_accept_manager(self):
        response = get_response('accept-manager-read-messages', 'post', self.user3, kwargs={'pk': 2})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @override_settings(CACHEOPS_ENABLED=False)
    def test_notifications_unauth(self):
        response = get_response('notifications', 'get')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    @override_settings(CACHEOPS_ENABLED=False)
    def test_notifications_common_user(self):
        response = get_response('notifications', 'get', self.user2)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    @override_settings(CACHEOPS_ENABLED=False)
    def test_notifications_staff(self):
        response = get_response('notifications', 'get', self.user1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['chat'], 1)

    @override_settings(CACHEOPS_ENABLED=False)
    def test_read_mesages_unauth(self):
        response = get_response('accept-manager-read-messages', 'put', kwargs={'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    @override_settings(CACHEOPS_ENABLED=False)
    def test_read_mesages_unauth(self):
        response = get_response('accept-manager-read-messages', 'put', self.user3, kwargs={'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    @override_settings(CACHEOPS_ENABLED=False)
    def test_read_mesages_auth(self):
        response = get_response('accept-manager-read-messages', 'put', self.user1, kwargs={'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @override_settings(CACHEOPS_ENABLED=False)
    def test_read_messages_retrieve_unauth(self):
        resposne = get_response('accept-manager-read-messages', 'get', self.user3, kwargs={'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    @override_settings(CACHEOPS_ENABLED=False)
    def test_read_messages_retrieve_unauth(self):
        response = get_response('accept-manager-read-messages', 'get', self.user1, kwargs={'pk': 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    