from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import DetectorViewSet, DetectorDataView

urlpatterns = [
    path('detector/data/<int:pk>/', DetectorDataView.as_view(), name='detector-data-list')
]

r = DefaultRouter()
r.register('detector', DetectorViewSet, basename='detector')
urlpatterns += r.urls