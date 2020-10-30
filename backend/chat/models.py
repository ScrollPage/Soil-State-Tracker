from django.db import models

from client.models import Client

class Chat(models.Model):
    '''Чатик'''
    participants = models.ManyToManyField(Client, verbose_name='Участники', related_name='chats')

    def __str__(self):
        return f'{self.id} chat'

    class Meta:
        verbose_name = 'Чат'
        verbose_name_plural = 'Чаты'
    
class Message(models.Model):
    '''Сообщение'''
    user = models.ForeignKey(Client, verbose_name='Пользователь', on_delete=models.CASCADE)
    content = models.TextField('Контент')
    timestamp = models.DateTimeField('Время отправки', auto_now_add=True)
    chat = models.ForeignKey(Chat, verbose_name='Чат', related_name='messages', on_delete=models.CASCADE)

    def __str__(self):
            return f'{self.user} user in {self.chat} chat'

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'
