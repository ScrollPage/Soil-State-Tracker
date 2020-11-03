from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path

from . import views 

urlpatterns = [
    
]

workers_list = views.CompanyViewSet.as_view({
    'get': 'workers'
})

detectors_list = views.CompanyViewSet.as_view({
    'get': 'detectors'
})

detectors_transfer_list = views.CompanyViewSet.as_view({
    'get': 'detectors_to_transfer'
})

add_detectors = views.CompanyViewSet.as_view({
    'post': 'add_detectors'
})

remove_detectors = views.CompanyViewSet.as_view({
    'post': 'remove_detectors'
})

company = views.CompanyViewSet.as_view({
    'post': 'create',
    'get': 'list'
})

company_detail = views.CompanyViewSet.as_view({
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
    'get': 'retrieve'
})

urlpatterns += format_suffix_patterns([
    path('company/<int:pk>/workers/', workers_list, name='workers-list'),
    path('company/<int:pk>/detectors/', detectors_list, name='detectors-list'),
    path('company/<int:pk>/transfer_detectors/', detectors_transfer_list, name='detectors-transfer-list'),
    path('company/<int:pk>/detectors/add/', add_detectors, name='add-detectors'),
    path('company/<int:pk>/detectors/remove/', remove_detectors, name='remove-detectors'),
    path('company/', company, name='company-list'),
    path('company/<int:pk>/', company_detail, name='company-detail'),
])