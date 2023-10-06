from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password1', 'password2')

class CustomAuthenticationForm(AuthenticationForm):
    class Meta:
        model = CustomUser

class ComentarioForm(forms.Form):
    contenido = forms.CharField(
        label='Comentario',
        widget=forms.Textarea(attrs={'placeholder': 'Escribe tu comentario aquí'}),
        max_length=200,  # Puedes ajustar la longitud máxima según tus necesidades
        required=True,
    )
