from django.contrib import admin
from .models import CustomUser, Materia, UsuarioMateria, Evaluacion, Debate, ComentarioDebate, Chat, Comentario


# Admin para el modelo CustomUser
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['username', 'first_name', 'last_name', 'rol', 'description', 'phone_number', 'instagram', 'twitter',
                    'linkedin']
    list_filter = ['rol']
    search_fields = ['username', 'first_name', 'last_name']


admin.site.register(CustomUser, CustomUserAdmin)


# Admin para el modelo Materia
class MateriaAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'profesor', 'nombre_profesor']
    list_filter = ['profesor']
    search_fields = ['nombre']


admin.site.register(Materia, MateriaAdmin)


# Admin para el modelo UsuarioMateria
class UsuarioMateriaAdmin(admin.ModelAdmin):
    list_display = ['usuario', 'materia']


admin.site.register(UsuarioMateria, UsuarioMateriaAdmin)


# Admin para el modelo Evaluacion
class EvaluacionAdmin(admin.ModelAdmin):
    list_display = ['codigo_materia', 'nombre', 'fecha_evaluacion']


admin.site.register(Evaluacion, EvaluacionAdmin)


# Admin para el modelo Debate
class DebateAdmin(admin.ModelAdmin):
    list_display = ['evaluacion', 'nombre', 'fecha_nueva', 'fecha_original', 'cerrado']
    list_filter = ['evaluacion']
    search_fields = ['nombre']


admin.site.register(Debate, DebateAdmin)


# Admin para el modelo ComentarioDebate
class ComentarioDebateAdmin(admin.ModelAdmin):
    list_display = ['usuario', 'debate', 'contenido', 'fecha_creacion']
    list_filter = ['usuario', 'debate']


admin.site.register(ComentarioDebate, ComentarioDebateAdmin)


# Admin para el modelo Chat
class ChatAdmin(admin.ModelAdmin):
    list_display = ['materia', 'nombre']


admin.site.register(Chat, ChatAdmin)


# Admin para el modelo Comentario
class ComentarioAdmin(admin.ModelAdmin):
    list_display = ['chat', 'usuario', 'contenido', 'fecha_creacion']
    list_filter = ['chat', 'usuario']


admin.site.register(Comentario, ComentarioAdmin)
