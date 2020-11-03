from rest_framework.routers import DefaultRouter
from django.urls import path

from .import views

urlpatterns = [
    
]

r = DefaultRouter()
r.register('detector', views.DetectorViewSet, basename='detector')
urlpatterns += r.urls