from django.contrib.auth import login, authenticate, logout
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt    
from rest_framework import status, viewsets, permissions
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Materia, CustomUser, Comentario, Chat, Evaluacion, Debate, ComentarioDebate
from .serializers import CustomUserSerializer, MateriaSerializer, EvaluacionSerializer, DebateSerializer, \
    ComentarioSerializer, UserLoginSerializer, UserRegisterSerializer, EvaluacionCalendarioSerializer, \
    ComentarioDebateSerializer

class UserRegister(CreateAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(request.data['password'])  # Hash the password
            user.save()
            return Response({'message': 'Registro exitoso'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                response_data = {
                    'id': user.id,
                    'username': user.username,
                    'message': 'Login successful',
                }
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    @action(detail=False, methods=['put'])
    def update_user_data(self, request, pk=None):
        user = self.get_object()
        if request.method == 'GET':
            # Aquí puedes recuperar y mostrar los datos del usuario
            serializer = CustomUserSerializer(user)
            return Response(serializer.data)

        elif request.method == 'PUT':
            # Aquí puedes actualizar los datos del usuario
            serializer = CustomUserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Datos de usuario actualizados con éxito'})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MateriaViewSet(viewsets.ModelViewSet):
    queryset = Materia.objects.all()
    serializer_class = MateriaSerializer

    @action(detail=False, methods=['post'])
    def crear_materia(self, request, user_id):
        # Obtener el usuario por ID
        try:
            usuario = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'message': 'El usuario especificado no existe'}, status=status.HTTP_404_NOT_FOUND)

        serializer = MateriaSerializer(data=request.data)
        if serializer.is_valid():
            # Verifica si el usuario actual tiene permiso para crear materias
            if usuario.rol == 'Staff':
                materia = serializer.save()

                # Crear un chat asociado a la materia
                Chat.objects.create(materia=materia, nombre=f"Chat de {materia.nombre}")

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'No autorizado para crear materias'}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def obtener_materias_usuario(self, request, user_id):
        print("Este print funciona")
        try:
            # Obtiene el usuario por nombre de usuario
            usuario = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'message': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        if usuario.rol == 'Student':
            print("Entro a lista de materias de alumno")
            # Filtra las materias asociadas al alumno actual
            queryset = Materia.objects.filter(users=usuario)
        elif usuario.rol == 'Teacher':
            # Filtra las materias que el profesor está enseñando
            queryset = Materia.objects.filter(profesor=usuario)
        else:  # Si el rol es "Staff", se muestran todas las materias
            queryset = self.queryset.all()

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def unirse_a_materia(self, request, materia_id):
        # Obtén el usuario al que quieres unir a la materia
        username_to_add = request.data.get('username')  # Debes proporcionar el nombre de usuario que deseas unir
        user_to_add = CustomUser.objects.get(username=username_to_add)

        try:
            # Obtén la materia a la que el usuario quiere unirse
            materia = self.queryset.get(codigo=materia_id)
        except Materia.DoesNotExist:
            return Response({'message': 'Materia no encontrada'}, status=status.HTTP_404_NOT_FOUND)

        # Puedes ajustar esta lógica según tus necesidades
        # Verifica que el usuario no esté ya unido a la materia
        if user_to_add not in materia.users.all():
            materia.users.add(user_to_add)
            return Response({'message': 'Usuario unido a la materia exitosamente'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'El usuario ya está unido a esta materia'}, status=status.HTTP_400_BAD_REQUEST)


class EvaluacionViewSet(viewsets.ModelViewSet):
    queryset = Evaluacion.objects.all()
    serializer_class = EvaluacionSerializer

    @action(detail=False, methods=['post'])
    def crear_evaluacion(self, request, materia_id):
        try:
            materia = Materia.objects.get(codigo=materia_id)
        except Materia.DoesNotExist:
            return Response({'message': 'La materia especificada no existe'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(codigo_materia=materia)
            return Response({'message': 'Evaluación creada exitosamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def obtener_evaluaciones_de_materia(self, request, materia_id):
        # Obtén la materia correspondiente
        try:
            materia = Materia.objects.get(codigo=materia_id)
        except Materia.DoesNotExist:
            return Response({'message': 'La materia especificada no existe'}, status=status.HTTP_404_NOT_FOUND)
        # Ver posible logica de autorizacion

        # Obtén las evaluaciones de la materia
        evaluaciones = Evaluacion.objects.filter(codigo_materia=materia)
        serializer = self.get_serializer(evaluaciones, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def obtener_fechas_evaluaciones_alumno(self, request, user_id):
        # Realiza la lógica para obtener las evaluaciones del usuario según su ID
        try:
            usuario = CustomUser.objects.get(id=user_id)  # Obtén el usuario por su ID

            if usuario.rol == 'Staff':
                # Si el usuario tiene el rol "Staff", muestra todas las evaluaciones
                evaluaciones = Evaluacion.objects.all()
            else:
                if usuario.rol == 'Student':
                    materias_del_usuario = Materia.objects.filter(users=usuario)
                elif usuario.rol == 'Teacher':
                    materias_del_usuario = Materia.objects.filter(profesor=usuario)
                else:
                    # Para otros roles, no se mostrarán las evaluaciones
                    materias_del_usuario = Materia.objects.all()

                # Filtra las evaluaciones de esas materias
                evaluaciones = Evaluacion.objects.filter(codigo_materia__in=materias_del_usuario)

            # Utiliza el nuevo serializador para incluir solo las fechas
            serializer = EvaluacionCalendarioSerializer(evaluaciones, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({'message': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)


class DebateViewSet(viewsets.ModelViewSet):
    queryset = Debate.objects.all()
    serializer_class = DebateSerializer

    @action(detail=False, methods=['get'])
    def listar_debates(self, request, user_id):
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'message': 'El usuario especificado no existe'}, status=status.HTTP_404_NOT_FOUND)

        if user.rol == 'Staff':
            # Si el usuario tiene el rol de 'Staff', devuelve todos los debates
            queryset = Debate.objects.all()
        elif user.rol == 'Student':
            # Si el usuario es 'Student', filtra debates de evaluaciones de materias asociadas al alumno
            queryset = Debate.objects.filter(evaluacion__codigo_materia__users=user)
        elif user.rol == 'Teacher':
            # Si el usuario es 'Teacher', filtra debates de materias donde es el profesor
            queryset = Debate.objects.filter(evaluacion__codigo_materia__profesor=user)
        else:
            # Otros casos no autorizados
            return Response({'message': 'No autorizado'}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def crear_debate(self, request, evaluacion_id):
        try:
            evaluacion = Evaluacion.objects.get(id=evaluacion_id)
        except Evaluacion.DoesNotExist:
            return Response({'message': 'La evaluación especificada no existe'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(evaluacion=evaluacion)
            return Response({'message': 'Debate creado exitosamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Se debe modificar el cerrar_debate segun como se quiera implementar en el front
    # La idea es que luego se modifique la fecha de la evaluacion asociada o no, y que en ambos casos se borre el debate
    @action(detail=True, methods=['patch'])
    def cerrar_debate(self, request, user_id):
        try:
            usuario = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'message': 'El usuario especificado no existe'}, status=status.HTTP_404_NOT_FOUND)

        if usuario.rol == 'Teacher':
            # Lógica para cerrar el debate
            return Response({'message': 'Debate cerrado exitosamente'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'No estás autorizado para realizar esta acción'},
                            status=status.HTTP_403_FORBIDDEN)

    @action(detail=False, methods=['get'])
    def obtener_debates_evaluacion(self, request, evaluacion_id):
        try:
            evaluacion = Evaluacion.objects.get(id=evaluacion_id)
        except Evaluacion.DoesNotExist:
            return Response({'message': 'La evaluación especificada no existe'}, status=status.HTTP_404_NOT_FOUND)

        debates = Debate.objects.filter(evaluacion=evaluacion)
        serializer = DebateSerializer(debates, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ComentarioDebateViewSet(viewsets.ModelViewSet):
    queryset = ComentarioDebate.objects.all()
    serializer_class = ComentarioDebateSerializer

    @action(detail=False, methods=['get'])
    def get_comentarios_de_debate(self, request, debate_id):
        comentarios = ComentarioDebate.objects.filter(debate__id=debate_id)
        serializer = self.get_serializer(comentarios, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def crear_comentario_de_debate(self, request, debate_id, user_id):
        try:
            # Obtén el debate
            debate = Debate.objects.get(id=debate_id)

            # Verifica si el debate está cerrado
            if debate.cerrado:
                return Response({'message': 'No puedes comentar en un debate cerrado'},
                                status=status.HTTP_400_BAD_REQUEST)

            # Obtén el usuario correspondiente al user_id
            usuario = CustomUser.objects.get(id=user_id)

            # Crea el comentario
            serializer = ComentarioDebateSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(debate=debate, usuario=usuario)
                return Response({'message': 'Comentario creado exitosamente'}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Debate.DoesNotExist:
            return Response({'message': 'El debate especificado no existe'}, status=status.HTTP_404_NOT_FOUND)
        except CustomUser.DoesNotExist:
            return Response({'message': 'El usuario especificado no existe'}, status=status.HTTP_404_NOT_FOUND)


class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer

    @action(detail=False, methods=['post'])
    def crear_comentario(self, request, materia_id, user_id):
        # Ajusta la lógica para obtener el usuario por ID
        try:
            usuario_actual = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'message': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        try:
            materia = Materia.objects.get(codigo=materia_id)
        except Materia.DoesNotExist:
            return Response({'message': 'La materia especificada no existe'}, status=status.HTTP_404_NOT_FOUND)

        chat = Chat.objects.get(materia=materia)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(chat=chat, usuario=usuario_actual)
            return Response({'message': 'Comentario creado exitosamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def comentarios_de_materia(self, request, materia_id):
        try:
            materia = Materia.objects.get(codigo=materia_id)
        except Materia.DoesNotExist:
            return Response({'message': 'La materia especificada no existe'}, status=status.HTTP_404_NOT_FOUND)

        # Filtra los comentarios relacionados con la materia
        comentarios = Comentario.objects.filter(chat__materia=materia)
        serializer = ComentarioSerializer(comentarios, many=True)
        return Response(serializer.data)
