# Hound Express

Sistema de gestión de envíos desarrollado con React + TypeScript y conectado a una API REST construida con Django REST Framework.

---

## Descripción

Hound Express es una aplicación fullstack orientada a la gestión de guías y envíos. El frontend permite consultar, registrar, actualizar y eliminar envíos consumiendo datos desde un backend desarrollado en Django.

---

## Tecnologías

### Frontend
- React
- TypeScript
- CSS
- Fetch API

### Backend
- Django
- Django REST Framework
- SQLite

---

## Funcionalidades

- Consulta de envíos registrados
- Registro de nuevas guías
- Actualización del estado de un envío
- Eliminación de registros
- Comunicación con API REST

---

## API

El frontend consume la API en:

```txt
http://127.0.0.1:8000/api/shipments/
