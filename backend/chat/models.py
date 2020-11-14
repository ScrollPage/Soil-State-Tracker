from django.db import models

from client.models import Client

class Message(models.Model):
    '''Сообщение'''
    full_name = models.CharField('Полное имя', max_length=50)
    content = models.TextField('Контент')
    timestamp = models.DateTimeField('Время отправки', auto_now_add=True)

    def __str__(self):
            return f'{self.full_name} message'

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'

class Chat(models.Model):
    '''Чатик'''
    user_name = models.CharField(max_length=50)
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