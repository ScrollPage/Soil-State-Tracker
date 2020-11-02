from rest_framework.routers import DefaultRouter
from django.urls import path

from . import views 

urlpatterns = [
    
]

r = DefaultRouter()
r.register('company', views.CompanyViewSet, basename='company')
urlpatterns += r.urls