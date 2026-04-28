from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

# ========================
# SECURITY
# ========================

SECRET_KEY = os.environ.get("SECRET_KEY")
if not SECRET_KEY:
    raise Exception("SECRET_KEY missing")

DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'

ALLOWED_HOSTS = ["*"]

# ========================
# APPLICATIONS
# ========================

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "users",
]

# ========================
# MIDDLEWARE (⚠️ ordre CRITIQUE)
# ========================

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # 🔥 DOIT ÊTRE EN PREMIER
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

# ========================
# DATABASE
# ========================

DB_ENGINE = os.environ.get("DB_ENGINE", "sqlite").strip().lower()

def get_env(name):
    value = os.environ.get(name)
    if not value:
        raise Exception(f"{name} missing")
    return value

if DB_ENGINE == "mssql":
    db_host = get_env("DB_HOST")
    db_port = os.environ.get("DB_PORT", "1433")

    DATABASES = {
        "default": {
            "ENGINE": "mssql",
            "NAME": get_env("DB_NAME"),
            "USER": get_env("DB_USER"),
            "PASSWORD": get_env("DB_PASSWORD"),
            "HOST": f"tcp:{db_host},{db_port}",
            "OPTIONS": {
                "driver": "ODBC Driver 18 for SQL Server",
                "extra_params": "Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;",
            },
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

# ========================
# AZURE SERVICES
# ========================

EVENT_HUB_CONNECTION_STRING = os.environ.get("EVENT_HUB_CONNECTION_STRING", "")
EVENT_HUB_NAME = os.environ.get("EVENT_HUB_NAME", "")

AZURE_STORAGE_CONNECTION_STRING = os.environ.get("AZURE_STORAGE_CONNECTION_STRING", "")
AZURE_STORAGE_SAS_EXPIRY_MINUTES = int(os.environ.get("AZURE_STORAGE_SAS_EXPIRY_MINUTES", "15"))

# ========================
# DEVICE CONFIG
# ========================

SINGLE_DEVICE_MODE = os.environ.get("SINGLE_DEVICE_MODE", "True").lower() == "true"
PRIMARY_DEVICE_ID = os.environ.get("PRIMARY_DEVICE_ID", "device-1")

# ========================
# PASSWORD VALIDATION
# ========================

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ========================
# INTERNATIONALIZATION
# ========================

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# ========================
# STATIC FILES
# ========================

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

# ========================
# DEFAULT FIELD
# ========================

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ========================
# 🔥🔥🔥 CORS / CSRF FIX FINAL 🔥🔥🔥
# ========================

CORS_ALLOW_ALL_ORIGINS = False  # ⚠️ obligatoire avec credentials

CORS_ALLOWED_ORIGINS = [
    "https://fayfront-c5h8eqete4dxgtcx.uksouth-01.azurewebsites.net",
    "https://fayback-e9h3f0c0fbfhgkar.uksouth-01.azurewebsites.net",
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

CSRF_TRUSTED_ORIGINS = [
    "https://fayfront-c5h8eqete4dxgtcx.uksouth-01.azurewebsites.net",
    "https://fayback-e9h3f0c0fbfhgkar.uksouth-01.azurewebsites.net",
]

SESSION_COOKIE_SAMESITE = "Lax"
SESSION_COOKIE_SECURE = True

CSRF_COOKIE_SAMESITE = "Lax"
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = False