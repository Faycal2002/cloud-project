FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
	PYTHONUNBUFFERED=1 \
	DEBIAN_FRONTEND=noninteractive

WORKDIR /app

# Install ODBC runtime and Microsoft SQL ODBC Driver 18 for Azure SQL connections.
RUN apt-get update \
	&& apt-get install -y --no-install-recommends curl gnupg unixodbc unixodbc-dev \
	&& curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > /usr/share/keyrings/microsoft-prod.gpg \
	&& curl https://packages.microsoft.com/config/debian/12/prod.list > /etc/apt/sources.list.d/mssql-release.list \
	&& apt-get update \
	&& ACCEPT_EULA=Y apt-get install -y --no-install-recommends msodbcsql18 \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
	&& pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["sh", "-c", "python run_listener.py & exec gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --workers 3 --timeout 120"]