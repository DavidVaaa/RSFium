from django.contrib.auth import login, authenticate, logout
from django.shortcuts import render, redirect
from django.urls import reverse
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .forms import CustomUserCreationForm, CustomAuthenticationForm, ComentarioForm, EvaluacionForm
from .models import Materia, CustomUser, Comentario, Chat, Evaluacion
from .serializers import CustomUserSerializer


def home(request):
    # Obtén los datos que deseas mostrar en la página de inicio, por ejemplo, una lista de materias
    materias = Materia.objects.all()

    # Pasa los datos a la plantilla
    return render(request, 'home.html', {'materias': materias})


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'Registro exitoso'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def user_login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Inicio de sesión exitoso'}, status=status.HTTP_200_OK)
        return Response({'message': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'])
    def user_logout(self, request):
        logout(request)
        return Response({'message': 'Cierre de sesión exitoso'}, status=status.HTTP_200_OK)

def materias_del_alumno(request):
    if request.user.is_authenticated and request.user.rol == 'Student':
        # Obtén las materias asociadas al alumno actual
        materias_del_alumno = request.user.materias.all()
        return render(request, 'materias_del_alumno.html', {'materias_del_alumno': materias_del_alumno})
    else:
        # Maneja el caso en el que el usuario no esté autenticado o no tenga el rol adecuado
        return render(request, 'pagina_de_error.html')


def unirse_a_materia(request, materia_id):
    usuario_actual = request.user

    # Obtén la materia a la que el usuario quiere unirse
    materia = Materia.objects.get(id=materia_id)

    roles_permitidos = ["Student", "Teacher"]
    if usuario_actual.rol in roles_permitidos:
        materia.users.add(usuario_actual)
        return redirect('pagina_de_materia', materia_id=materia_id)
    else:
        return redirect('pagina_de_error')


def crear_comentario(request, materia_id, chat_id):
    # Obtén el usuario actual
    usuario_actual = request.user

    materia = Materia.objects.get(id=materia_id)
    chat = Chat.objects.get(id=chat_id)

    # Verifica si el usuario está autorizado para publicar comentarios en este chat
    if not usuario_actual.tiene_rol_adecuado() or chat.materia != materia:
        return redirect('pagina_de_error')

    if request.method == 'POST':
        # Si la solicitud es un POST, procesa el formulario de comentario
        formulario = ComentarioForm(request.POST)

        if formulario.is_valid():
            contenido = formulario.cleaned_data['contenido']
            comentario = Comentario(chat=chat, usuario=usuario_actual, contenido=contenido)
            comentario.save()
            return redirect('pagina_del_chat', materia_id=materia_id, chat_id=chat_id)
    else:
        # Si la solicitud no es un POST, muestra el formulario de comentario vacío
        formulario = ComentarioForm()

    return render(request, 'crear_comentario.html', {'formulario': formulario})


def comentarios_del_chat(request, chat_id):
    # Obtén el chat correspondiente
    chat = Chat.objects.get(id=chat_id)

    # Obtén todos los comentarios asociados a ese chat
    comentarios = Comentario.objects.filter(chat=chat)

    return render(request, 'comentarios_del_chat.html', {'chat': chat, 'comentarios': comentarios})


def ingresar_evaluacion(request, materia_id):
    # Verifica si el usuario está autenticado y tiene el rol de "Teacher"
    if request.user.is_authenticated and request.user.rol == 'Teacher':
        # Obtén la materia correspondiente
        materia = Materia.objects.get(id=materia_id)

        # Verifica si el usuario es el profesor de la materia
        if materia.profesor == request.user:
            if request.method == 'POST':
                # Procesa el formulario de evaluación
                formulario = EvaluacionForm(request.POST)
                if formulario.is_valid():
                    nombre = formulario.cleaned_data['nombre']
                    fecha_evaluacion = formulario.cleaned_data['fecha_evaluacion']

                    # Crea y guarda la evaluación asociada a la materia
                    evaluacion = Evaluacion(codigo_materia=materia, nombre=nombre, fecha_evaluacion=fecha_evaluacion)
                    evaluacion.save()

                    # Redirige a la página de detalle de la materia
                    return redirect('detalle_materia', materia_id=materia_id)
            else:
                # Si la solicitud no es un POST, muestra el formulario de evaluación vacío
                formulario = EvaluacionForm()

            return render(request, 'ingresar_evaluacion.html', {'formulario': formulario, 'materia': materia})
        else:
            # Maneja el caso en el que el usuario no sea el profesor de la materia
            return render(request, 'pagina_de_error.html')
    else:
        # Maneja el caso en el que el usuario no esté autenticado o no tenga el rol adecuado
        return render(request, 'pagina_de_error.html')
