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
router.register(r'comentariosdebate', views.ComentarioDebateViewSet, basename='comentariodebate')



urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', UserRegister.as_view(), name='register'),
    path('api/login/', UserLogin.as_view(), name='login'),
    path('api/logout/', UserLogout.as_view(), name='logout'),
    path('api/users/update/<int:pk>/', views.CustomUserViewSet.as_view({'get': 'update_user_data', 'put': 'update_user_data'}), name='update-user-data'),
    path('api/materia/crear/<int:user_id>/', views.MateriaViewSet.as_view({'post': 'crear_materia'}),
         name='crear_materia'),
    path('api/materias/unirse/<int:materia_id>/', views.MateriaViewSet.as_view({'post': 'unirse_a_materia'}),
         name='materia-unirse'),
    path('api/materias/obtener/<int:user_id>/', views.MateriaViewSet.as_view({'get': 'obtener_materias_usuario'}), name='obtener-materias-usuario'),

    path('api/materia/<int:materia_id>/evaluaciones/crear/', views.EvaluacionViewSet.as_view({'post': 'crear_evaluacion'}), name='crear_evaluacion'),
    path('api/materia/<int:materia_id>/evaluaciones/', views.EvaluacionViewSet.as_view({'get': 'obtener_evaluaciones_de_materia'}), name='obtener_evaluaciones_de_materia'),
    path('api/evaluaciones/fechas/<int:user_id>/', views.EvaluacionViewSet.as_view({'get': 'obtener_fechas_evaluaciones_alumno'}), name='obtener-fechas-evaluaciones-alumno'),
    path('api/evaluacion/<int:evaluacion_id>/debates/crear/', views.DebateViewSet.as_view({'post': 'crear_debate'}),
         name='crear_debate'),
    path('api/debate/listar/<int:user_id>', views.DebateViewSet.as_view({'get': 'listar_debates'}), name='listar_debates'),
    path('api/debate/cerrar/<int:user_id>/', views.DebateViewSet.as_view({'patch': 'cerrar_debate'}),
         name='cerrar_debate'),
    path('api/evaluacion/<int:evaluacion_id>/debates/',
         views.DebateViewSet.as_view({'get': 'obtener_debates_evaluacion'}), name='obtener_debates_evaluacion'),
    path('api/materia/<int:materia_id>/<int:user_id>/comentario/crear/', views.ComentarioViewSet.as_view({'post': 'crear_comentario'}), name='crear_comentario'),
    path('api/materia/<int:materia_id>/comentarios/', views.ComentarioViewSet.as_view({'get': 'comentarios_de_materia'}), name='comentarios_de_materia'),
    path('api/debates/<int:debate_id>/comentarios/',
         views.ComentarioDebateViewSet.as_view({'get': 'get_comentarios_de_debate'}), name='comentarios_debate'),
    path('api/debate/<int:debate_id>/crear/<int:user_id>/',
         views.ComentarioDebateViewSet.as_view({'post': 'crear_comentario_de_debate'}), name='crear_comentario_debate'),

]
