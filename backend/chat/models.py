from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.utils import timezone

from client.models import Client

class Message(models.Model):
    '''Сообщение'''
    full_name = models.CharField('Полное имя', max_length=50)
    content = models.TextField('Контент')
    timestamp = models.DateTimeField('Время отправки', default=timezone.localtime(timezone.now()))

    def __str__(self):
            return f'{self.full_name} message'

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'

class Chat(models.Model):
    '''Чатик'''
    user_name = models.CharField('Имя пользователя', max_length=50)
    manager = models.ForeignKey(Client, verbose_name='Мэнэджер', on_delete=models.DO_NOTHING, null=True)
    messages = models.ManyToManyField(Message, verbose_name='Сообщения')

    def __str__(self):
        return f'chat with manager {self.manager}'

    def delete(self):
        self.messages.delete()
        super().delete()

    class Meta:
        verbose_name = 'Чат'
        verbose_name_plural = 'Чаты'

class NewChatNotification(models.Model):
    '''Уведомление о чатике'''
    user_name = models.CharField('Имя пользователя', max_length=50)
    chat = models.ForeignKey(Chat, verbose_name='Чат', on_delete=models.CASCADE)

    def __str__(self):
        return f'Notification to {self.chat}'

    class Meta:
        verbose_name = 'Уведомление о новом чате'
        verbose_name_plural = 'Уведомления о новых чатах'

@receiver(post_save, sender=Chat)
def send_conf_mail(sender, instance=None, created=False, **kwargs):
    if created:
        map(
            lambda manager: settings.pusher_client.trigger(
                f'notifications{manager.id}', 
                'new_chat',
                {'chat': instance.id, 'user_name': instance.user_name}
            ),
            Client.objects.filter(is_staff=True)
        )

        NewChatNotification.objects.create(chat=instance, user_name=instance.user_name)