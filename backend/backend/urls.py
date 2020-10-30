from django.contrib import admin
from django.urls import path, include

from .yasg import urlpatterns as doc_urls

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include('chat.api.urls')),
    path('api/', include('client.api.urls')),
    path('api/', include('company.api.urls')),
    path('api/', include('detector.api.urls')),
    path('api/', include('payment.api.urls')),

    path('api-auth/', include('rest_framework.urls')),

    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]

urlpatterns += doc_urls