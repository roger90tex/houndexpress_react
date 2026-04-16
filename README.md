# Hound Express 🚚

Sistema de gestión de envíos desarrollado con arquitectura fullstack utilizando React y Django REST Framework.

## 🧠 Descripción

Hound Express es una aplicación que permite gestionar envíos de manera sencilla, incluyendo:

- Registro de guías
- Consulta de envíos
- Actualización de estados
- Eliminación de registros

## ⚙️ Tecnologías utilizadas

### Frontend
- React
- TypeScript
- Fetch API

### Backend
- Django
- Django REST Framework
- SQLite

## 🔌 Funcionalidades principales

- Crear envíos (POST)
- Obtener envíos (GET)
- Actualizar estado (PATCH)
- Eliminar envíos (DELETE)

## 🚀 Cómo ejecutar el proyecto

### Backend (Django)

```bash
pip install -r requirements.txt
python manage.py runserver
Servidor en:
http://127.0.0.1:8000/
---

### Frontend (React)

```bash
npm install
npm start


---

## 🔗 Y finalmente la conexión (esto es CLAVE)

```md
---

## 🔗 Comunicación

El frontend consume la API en:

http://127.0.0.1:8000/api/shipments/
You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
