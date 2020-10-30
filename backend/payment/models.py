from django.db import models

from company.models import Company
from detector.models import Detector

class Payment(models.Model):
    company = models.ForeignKey(
        Company, 
        verbose_name='Компания-плательщик', 
        related_name='operations', 
        on_delete=models.DO_NOTHING
    )
    detectors = models.ManyToManyField(Detector, verbose_name='Оплачиваемые датчики')
    timestamp = models.DateTimeField('Время заключения догвоора', auto_now_add=True),
    timestamp_end = models.DateTimeField('Время окончания действия договора')
    amount = models.DecimalField('Сумма', max_digits=10, decimal_places=2)

    def __str__(self):
        return f'Payment from {self.company}, amount = {self.amount}'

    class Meta:
        verbose_name = 'Договор оплаты'
        verbose_name_plural = 'Договоры оплаты'