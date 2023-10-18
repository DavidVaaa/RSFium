from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import MateriaViewSet

router = DefaultRouter()
router.register(r'customusers', views.CustomUserViewSet, basename='customuser')
router.register(r'materias', MateriaViewSet, basename='materia')
router.register(r'evaluaciones', views.EvaluacionViewSet, basename='evaluacion')



urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', views.CustomUserViewSet.as_view({'post': 'register'}), name='customuser-register'),
    path('api/login/', views.CustomUserViewSet.as_view({'post': 'user_login'}), name='customuser-login'),
    path('api/logout/', views.CustomUserViewSet.as_view({'post': 'user_logout'}), name='customuser-logout'),
    path('api/materias/unirse/<int:pk>/', MateriaViewSet.as_view({'post': 'unirse_a_materia'}), name='materia-unirse'),
    path('materia/<int:materia_id>/evaluaciones/crear/', views.EvaluacionViewSet.as_view({'post': 'crear_evaluacion'}),
         name='crear_evaluacion'),
]

