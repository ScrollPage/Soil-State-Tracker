from django.urls import path

from . import views

urlpatterns = [
    path('activate/', views.ClientActivation.as_view(), name='activate'),
]