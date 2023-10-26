from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import MateriaViewSet, UserRegister, UserLogin, UserLogout

router = DefaultRouter()
router.register(r'customusers', views.CustomUserViewSet, basename='customuser')
router.register(r'materias', MateriaViewSet, basename='materia')
router.register(r'evaluaciones', views.EvaluacionViewSet, basename='evaluacion')
router.register(r'debates', views.DebateViewSet, basename='debate')
router.register(r'comentarios', views.ComentarioViewSet, basename='comentario')


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', UserRegister.as_view(), name='register'),
    path('api/login/', UserLogin.as_view(), name='login'),
    path('api/logout/', UserLogout.as_view(), name='logout'),
    path('api/usuarios/<int:pk>/listar-materias/', views.CustomUserViewSet.as_view({'get': 'list_materias'}), name='listar-materias-usuario'),
    path('api/users/update/<int:pk>/', views.CustomUserViewSet.as_view({'get': 'update_user_data', 'put': 'update_user_data'}), name='update-user-data'),
    path('api/materias/create/', MateriaViewSet.as_view({'post': 'create'}), name='materia-create'),
    path('api/materias/list/', MateriaViewSet.as_view({'get': 'list'}), name='materia-list'),
    path('api/materias/unirse/<int:materia_id>/', views.MateriaViewSet.as_view({'post': 'unirse_a_materia'}),
         name='materia-unirse'),
    path('materia/<int:materia_id>/evaluaciones/crear/', views.EvaluacionViewSet.as_view({'post': 'crear_evaluacion'}),
         name='crear_evaluacion'),
    path('api/evaluacion/<int:evaluacion_id>/debates/crear/', views.DebateViewSet.as_view({'post': 'crear_debate'}),
         name='crear_debate'),
    path('api/debate/<int:pk>/cerrar/', views.DebateViewSet.as_view({'patch': 'cerrar_debate'}), name='cerrar_debate'),
    path('api/evaluacion/<int:evaluacion_id>/debates/',
         views.DebateViewSet.as_view({'get': 'obtener_debates_evaluacion'}), name='obtener_debates_evaluacion'),
    path('api/materia/<int:materia_id>/chat/<int:chat_id>/crear-comentario/', views.ComentarioViewSet.as_view({'post': 'crear_comentario'}), name='crear_comentario'),
    path('api/chat/<int:chat_id>/comentarios/', views.ComentarioViewSet.as_view({'get': 'comentarios_del_chat'}), name='comentarios_del_chat'),
]
