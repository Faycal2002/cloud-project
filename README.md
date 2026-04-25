# Cloud Project

Full-stack IoT monitoring project:
- Frontend: React
- Backend: Django + Django REST Framework
- Data: SQLite (local) or Azure SQL (MSSQL)
- Streaming: Azure IoT Hub/Event Hub listener

## Project Structure

```text
.
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

From the repository root:

```bash
npm install
npm start
```

Frontend runs on `http://localhost:3000` by default.

## Run Backend (Django API)

From `backend/backend`:

```bash
python -m venv .venv
# Windows PowerShell:
. .venv/Scripts/Activate.ps1

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs on `http://127.0.0.1:8000` by default.

## Run IoT Listener (Optional)

From `backend/backend` (same Python environment):

```bash
python run_listener.py
```

The listener reads Event Hub messages and stores sensor data through the backend service layer.

## API Base Path

All backend endpoints are under:

```text
/api/
```

Main routes:

- `POST /api/register/`
- `POST /api/login/`
- `POST /api/logout/`
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
