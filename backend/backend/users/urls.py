from django.urls import path
from . import views
from .views import register_user, login_user, logout_user
from .views import camera_events

app_name = "users"

urlpatterns = [

    path("latest/", views.latest_reading),
    path("history/", views.readings_history),
    path("add/", views.add_reading),
    path("readings/", views.readings_crud, name="readings_crud"),
    path("readings/<int:reading_id>/", views.reading_detail_crud, name="reading_detail_crud"),
    path("images/crud/", views.images_crud, name="images_crud"),
    path("images/crud/<int:image_id>/", views.image_detail_crud, name="image_detail_crud"),

    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path("images/", camera_events),
]


