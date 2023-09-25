import csv
from backend.backend.models import Materia

def importar_materias_desde_csv(ruta_csv):
    with open(ruta_csv, newline='', encoding='utf-8') as archivo_csv:
        lector_csv = csv.DictReader(archivo_csv, delimiter=';')
        for fila in lector_csv:
            id_subject = int(fila['ID'])
            name_subject = fila['Nombre']
            Materia.objects.create(id_materia=id_subject, nombre=name_subject)

if __name__ == '__main__':
    ruta_csv = 'database/Tablas.csv'  # Reemplaza con la ruta correcta a tu archivo CSV
    importar_materias_desde_csv(ruta_csv)
