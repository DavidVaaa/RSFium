from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'customusers', views.CustomUserViewSet, basename='customuser')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', views.CustomUserViewSet.as_view({'post': 'register'}), name='customuser-register'),
    path('api/login/', views.CustomUserViewSet.as_view({'post': 'user_login'}), name='customuser-login'),
    path('api/logout/', views.CustomUserViewSet.as_view({'post': 'user_logout'}), name='customuser-logout'),
]

