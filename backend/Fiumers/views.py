from django.contrib.auth import login, authenticate, logout
from django.shortcuts import render, redirect
from django.urls import reverse
from rest_framework import status, viewsets, permissions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .forms import CustomUserCreationForm, CustomAuthenticationForm, ComentarioForm, EvaluacionForm
from .models import Materia, CustomUser, Comentario, Chat, Evaluacion, Debate
from .serializers import CustomUserSerializer, MateriaSerializer, EvaluacionSerializer, DebateSerializer


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
        data = request.data  # Obtiene los datos de la solicitud
        data['rol'] = 'Student'  # Establece el rol en "Student" por defecto

        serializer = self.get_serializer(data=data)
        
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'Registro exitoso'}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['post'])
    def user_login(self, request):
        username = request.data.get('username')
        user = CustomUser.objects.filter(username=username).first()
        print(user)
        if user is not None:
            login(request, user)
            return Response({'message': 'Inicio de sesión exitoso'}, status=status.HTTP_200_OK)

        return Response({'message': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'])
    def user_logout(self, request):
        logout(request)
        return Response({'message': 'Cierre de sesión exitoso'}, status=status.HTTP_200_OK)


class MateriaViewSet(viewsets.ModelViewSet):
    queryset = Materia.objects.all()
    serializer_class = MateriaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        serializer = MateriaSerializer(data=request.data)

        if serializer.is_valid():
            # Verifica si el usuario actual tiene permiso para crear materias (puedes ajustar esta lógica)
            if request.user.rol == 'Teacher':
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'No autorizado para crear materias'}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        if request.user.rol == 'Student':
            # Filtra las materias asociadas al alumno actual
            queryset = self.queryset.filter(users=request.user)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response({'message': 'No autorizado'}, status=status.HTTP_403_FORBIDDEN)

    def unirse_a_materia(self, request, materia_id):
        usuario_actual = request.user

        try:
            # Obtén la materia a la que el usuario quiere unirse
            materia = self.queryset.get(id=materia_id)
        except Materia.DoesNotExist:
            return Response({'message': 'Materia no encontrada'}, status=status.HTTP_404_NOT_FOUND)

        roles_permitidos = ["Student", "Teacher"]
        if usuario_actual.rol in roles_permitidos:
            materia.users.add(usuario_actual)
            return Response({'message': 'Unido exitosamente'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'No autorizado'}, status=status.HTTP_403_FORBIDDEN)


class EvaluacionViewSet(viewsets.ModelViewSet):
    queryset = Evaluacion.objects.all()
    serializer_class = EvaluacionSerializer

    @action(detail=False, methods=['post'])
    def crear_evaluacion(self, request, materia_id):
        # Obtener la materia correspondiente
        try:
            materia = Materia.objects.get(id=materia_id)
        except Materia.DoesNotExist:
            return Response({'message': 'La materia especificada no existe'}, status=status.HTTP_404_NOT_FOUND)

        # Verificar si el usuario actual es el profesor de la materia
        if request.user == materia.profesor:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save(codigo_materia=materia)
                return Response({'message': 'Evaluación creada exitosamente'}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'No estás autorizado para realizar esta acción'},
                            status=status.HTTP_403_FORBIDDEN)

    @action(detail=False, methods=['get'])
    def obtener_evaluaciones_de_materia(self, request, materia_id):
        # Obtén la materia correspondiente
        try:
            materia = Materia.objects.get(id=materia_id)
        except Materia.DoesNotExist:
            return Response({'message': 'La materia especificada no existe'}, status=status.HTTP_404_NOT_FOUND)

        # Verificar si el usuario actual es el profesor de la materia o tiene permisos adecuados
        # Aquí puedes agregar la lógica de autorización según tus requerimientos

        # Obtén las evaluaciones de la materia
        evaluaciones = Evaluacion.objects.filter(codigo_materia=materia)
        serializer = self.get_serializer(evaluaciones, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


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


class DebateViewSet(viewsets.ModelViewSet):
    queryset = Debate.objects.all()
    serializer_class = DebateSerializer

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def crear_debate(self, request, evaluacion_id):
        try:
            evaluacion = Evaluacion.objects.get(id=evaluacion_id)
        except Evaluacion.DoesNotExist:
            return Response({'message': 'La evaluación especificada no existe'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(evaluacion=evaluacion, usuario=request.user)
            return Response({'message': 'Debate creado exitosamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Se debe modificar el cerrar_debate segun como se quiera implementar en el front
    # La idea es que luego se modifique la fecha de la evaluacion asociada o no, y que en ambos casos se borre el debate
    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated])
    def cerrar_debate(self, request, pk):
        debate = self.get_object()
        if request.user.rol == 'Teacher':
            debate.cerrado = True
            debate.save()
            return Response({'message': 'Debate cerrado exitosamente'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def obtener_debates_evaluacion(self, request, evaluacion_id):
        try:
            evaluacion = Evaluacion.objects.get(id=evaluacion_id)
        except Evaluacion.DoesNotExist:
            return Response({'message': 'La evaluación especificada no existe'}, status=status.HTTP_404_NOT_FOUND)

        debates = Debate.objects.filter(evaluacion=evaluacion)
        serializer = DebateSerializer(debates, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
