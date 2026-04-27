# Cloud Project

 overview-page
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


Full-stack IoT monitoring project:
- Frontend: React
- Backend: Django + Django REST Framework
- Data: SQLite (local) or Azure SQL (MSSQL)
- Streaming: Azure IoT Hub/Event Hub listener

 main
## Project Structure

```text
.
 overview-page
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

|- src/                          # React app
|  |- components/
|  |- pages/
|  |- utils/
|  |- App.js
|  `- index.js
|- backend/
|  `- backend/
|     |- manage.py
|     |- run_listener.py
|     |- requirements.txt
|     |- backend/               # Django project (settings, urls, wsgi)
|     `- users/                 # API app (auth, readings, images)
|- Dockerfile
`- README.md
```

## Features

- User auth: register, login, logout
- Sensor readings:
	- latest value
	- history
	- full CRUD endpoints
- Alert logic:
	- warning/critical status based on temperature and humidity
- Camera events/images API
- IoT listener that consumes Event Hub messages and stores readings

## Requirements

- Node.js 18+
- Python 3.11+
- pip
- (Optional for MSSQL) ODBC Driver 18 for SQL Server

## Environment Variables

Create a `.env` file at the repository root.

Example (safe template):

```dotenv
SECRET_KEY=replace-with-a-strong-secret
DEBUG=True
DB_ENGINE=sqlite

# MSSQL (required only when DB_ENGINE=mssql)
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=your-server.database.windows.net
DB_PORT=1433

# IoT Hub / Event Hub (required only for run_listener.py)
EVENT_HUB_CONNECTION_STRING=
EVENT_HUB_NAME=

# Azure Blob (optional for signed image links)
AZURE_STORAGE_CONNECTION_STRING=
AZURE_STORAGE_SAS_EXPIRY_MINUTES=15

# Device mode
SINGLE_DEVICE_MODE=True
PRIMARY_DEVICE_ID=device-1
```

## Run Frontend
 main

From the repository root:

```bash
npm install
npm start
```

 overview-page
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

Frontend runs on `http://localhost:3000` by default.

## Run Backend (Django API)

From `backend/backend`:

```bash
python -m venv .venv
# Windows PowerShell:
. .venv/Scripts/Activate.ps1

pip install -r requirements.txt
 main
python manage.py migrate
python manage.py runserver
```

 overview-page
The backend runs on:

```text
http://127.0.0.1:8000
```

### 3) IoT Listener

From the same backend environment:

Backend runs on `http://127.0.0.1:8000` by default.

## Run IoT Listener (Optional)

From `backend/backend` (same Python environment):
 main

```bash
python run_listener.py
```

overview-page
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

The listener reads Event Hub messages and stores sensor data through the backend service layer.

## API Base Path

All backend endpoints are under:

```text
/api/
```

Main routes:
 main

- `POST /api/register/`
- `POST /api/login/`
- `POST /api/logout/`
overview-page

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

- `GET /api/latest/`
- `GET /api/history/`
- `GET,POST /api/readings/`
- `GET,PUT,PATCH,DELETE /api/readings/<id>/`
- `GET,POST /api/images/`

## Frontend Routing

React routes currently defined:

- `/` (login)
- `/login`
- `/register`
- `/dashboard`
- `/devices`
- `/energy`

## Notes

- The frontend API URL is currently hardcoded in `src/utils/api.js`.
- For local end-to-end development, point it to your local backend URL if needed.
- If using MSSQL, ensure network/firewall access and SQL credentials are valid.
 main
