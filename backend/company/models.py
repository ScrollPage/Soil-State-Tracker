from django.db import models

from client.models import Client

class Company(models.Model):
    '''Компания'''
    name = models.CharField('Название', max_length=50, unique=True)
    url = models.URLField('Ссылка', max_length=100)
    admin = models.ForeignKey(Client, verbose_name='Администратор', on_delete=models.CASCADE)
    workers = models.ManyToManyField(Client, verbose_name='Работники', related_name='work')

    def __str__(self):
        return f'company {self.name}'

    class Meta:
        verbose_name = 'Компания'
        verbose_name_plural = 'Компании'
