from django.urls import path
from . import views
from .views import register_user, login_user, logout_user
from .views import save_image

app_name = "users"

urlpatterns = [

    path("latest/", views.latest_reading),
    path("history/", views.readings_history),
    path("add/", views.add_reading),

    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path("images/", save_image),
]


