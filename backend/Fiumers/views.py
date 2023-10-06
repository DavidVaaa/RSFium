from django.contrib.auth import login, authenticate, logout
from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm, CustomAuthenticationForm, ComentarioForm
from .models import Materia, CustomUser, Comentario, Chat


def home(request):
    # Obtén los datos que deseas mostrar en la página de inicio, por ejemplo, una lista de materias
    materias = Materia.objects.all()

    # Pasa los datos a la plantilla
    return render(request, 'home.html', {'materias': materias})


def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')  # Replace 'home' with your desired redirect URL after registration!
    else:
        form = CustomUserCreationForm()
    # Reemplazar con ruta a la pagina luego del register
    return render(request, 'registration/register.html', {'form': form})


def user_login(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')  # Replace 'home' with your desired redirect URL after login
    else:
        form = CustomAuthenticationForm()
    return render(request, 'registration/login.html', {'form': form})


def user_logout(request):
    logout(request)
    return redirect('login')  # Redirect to the login page after logout


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
