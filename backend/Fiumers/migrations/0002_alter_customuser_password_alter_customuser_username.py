from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Fiumers', '0001_initial'),
        ("Fiumers", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customuser",
            name="username",
            field=models.CharField(max_length=30, unique=True),
        ),
    ]
