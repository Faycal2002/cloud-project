# Cloud Project

A full-stack IoT monitoring platform for a smart industrial system.
It combines a React dashboard, a Django REST API, Azure SQL storage, and Azure IoT/Event Hub integration.

## What This Project Does

- Monitors live sensor readings such as temperature and humidity
- Detects alerts when values go beyond thresholds
- Stores sensor data in a cloud database
- Displays live analytics in a clean web dashboard
- Supports camera events and image records for admin users
- Uses an Azure-based backend and cloud services

## Tech Stack

| Layer      | Technology                                      |
| ---------- | ----------------------------------------------- |
| Frontend   | React, React Router, Tailwind CSS               |
| Backend    | Django, Django REST Framework                   |
| Database   | Azure SQL / MSSQL, SQLite for local development |
| Messaging  | Azure IoT Hub / Event Hub                       |
| Storage    | Azure Blob Storage                              |
| Deployment | Azure App Service / Docker                      |

## Main Features

- User authentication with login, register, and logout
- Role-based access control for admin users
- Real-time dashboard with temperature, humidity, and status cards
- Device history view for sensor and camera records
- Alert logic for warning and critical states
- Energy analytics page with charts and risk scoring
- IoT listener that consumes event hub messages and saves readings

## Project Structure

```text
.
├── src/                         # React frontend
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── App.js
├── backend/
│   └── backend/
│       ├── manage.py
│       ├── run_listener.py
│       ├── requirements.txt
│       ├── Dockerfile
│       ├── backend/             # Django project
│       └── users/               # API app
├── Dockerfile
└── README.md
```

## Local Setup

### 1) Frontend

From the repository root:

```bash
npm install
npm start
```

The frontend runs on:

```text
http://localhost:3000
```

### 2) Backend

Go to the backend folder:

```bash
cd backend/backend
```

Create a virtual environment and install dependencies:

```bash
python -m venv .venv
# Windows PowerShell
. .venv/Scripts/Activate.ps1

pip install -r requirements.txt
```

Run migrations and start Django:

```bash
python manage.py migrate
python manage.py runserver
```

The backend runs on:

```text
http://127.0.0.1:8000
```

### 3) IoT Listener

From the same backend environment:

```bash
python run_listener.py
```

This listener reads Azure IoT Hub / Event Hub messages and saves sensor data.

## Environment Variables

Create a `.env` file at the project root.

```dotenv
SECRET_KEY=replace-with-a-secure-key
DEBUG=True
DB_ENGINE=sqlite

# Azure SQL (required when DB_ENGINE=mssql)
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=your-server.database.windows.net
DB_PORT=1433

# Azure IoT / Event Hub
EVENT_HUB_CONNECTION_STRING=
EVENT_HUB_NAME=

# Azure Blob Storage
AZURE_STORAGE_CONNECTION_STRING=
AZURE_STORAGE_SAS_EXPIRY_MINUTES=15

# Device behavior
SINGLE_DEVICE_MODE=True
PRIMARY_DEVICE_ID=device-1
```

## API Routes

All API routes are prefixed with `/api/`.

### Authentication

- `POST /api/register/`
- `POST /api/login/`
- `POST /api/logout/`

### Sensor Readings

- `GET /api/latest/`
- `GET /api/history/`
- `GET, POST /api/readings/`
- `GET, PUT, PATCH, DELETE /api/readings/<id>/`

### Camera / Image Data

- `GET, POST /api/images/` (camera events endpoint)
- `GET, PUT, PATCH, DELETE /api/images/<id>/` (admin CRUD endpoint)
- `GET, PUT, PATCH, DELETE /api/images/crud/<id>/` (alternate CRUD endpoint)

## Frontend Pages

- `/` - login page
- `/login` - login page
- `/register` - sign up page
- `/dashboard` - main overview dashboard
- `/devices` - sensor and camera readings
- `/energy` - analytics and risk insight page

## Deployment Notes

- The backend is designed to run on Azure App Service with Docker.
- Static files are collected at startup for Django admin and public assets.
- If you use Azure SQL, make sure the database is active and migrations are applied.
- If the admin page shows a 403 or 500, check CORS, CSRF, migrations, and database status in Azure.

## Troubleshooting

### Django admin does not load correctly

If `/admin` opens but styles/scripts fail:

- make sure `collectstatic` ran successfully
- verify the `/app/staticfiles/` directory exists in Azure logs
- confirm WhiteNoise is installed and enabled

### Login or admin fails on Azure

If the backend is deployed but login does not work:

- check that the Azure SQL database is not paused
- confirm the superuser exists in the Azure database
- verify `CSRF_TRUSTED_ORIGINS` and `CORS_ALLOWED_ORIGINS`

### Energy page shows no live values

If no live readings appear:

- confirm the backend API is reachable
- check IoT Hub / Event Hub credentials
- verify messages are arriving and being stored in the database

## Useful Commands

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python run_listener.py
```

## Notes

- Frontend API calls are defined in `src/utils/api.js`.
- The dashboard uses live backend data when available.
- The Energy page calculates a simple risk score based on temperature and humidity thresholds.
- The project is structured to support a smart industrial monitoring scenario.
