from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    
]

activate = views.ClientActivity.as_view({
    'post': 'activate'
})

check_activity = views.ClientActivity.as_view({
    'get': 'retrieve'
})

urlpatterns += format_suffix_patterns([
    path('activate/', activate, name='activate'),
    path('activity/<str:email>/', check_activity, name='check-activity')
])