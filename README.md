# Cloud Project

Application full stack avec un frontend React et un backend Django REST.

## Pile technique
- Frontend: React + Tailwind CSS
- Backend: Django + Django REST Framework
- Base de donnees: SQLite (dev)

## Structure
```
backend/
	api/                  # App Django (models, serializers, views, urls)
	config/               # Settings et urls du projet
	manage.py
src/
	components/           # Composants reutilisables (Navbar, etc.)
	pages/                # Pages de l'application
	utils/                # Appels API
	App.js                # Routing principal
	index.js              # Point d'entree
public/
```

## Installation
### Frontend
```bash
npm install
npm start
```

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## Endpoints API
Base URL: `http://127.0.0.1:8000/api/`

- `GET /devices/`
- `POST /devices/`
- `GET /devices/{id}/`
- `PUT /devices/{id}/`
- `PATCH /devices/{id}/`
- `DELETE /devices/{id}/`

## Pages disponibles
- `/` - Accueil
- `/login` - Connexion
- `/register` - Inscription
- `/dashboard` - Dashboard
