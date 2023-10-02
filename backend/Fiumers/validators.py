from django.core.exceptions import ValidationError

def validate_teacher_role(user):
    if user.rol != 'Teacher':
        raise ValidationError('El profesor debe tener el rol "Teacher".')
