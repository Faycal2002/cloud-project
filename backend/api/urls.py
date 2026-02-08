from rest_framework.routers import DefaultRouter
from .views import ValueViewSet


router = DefaultRouter()
router.register(r'values', ValueViewSet)

urlpatterns = router.urls



