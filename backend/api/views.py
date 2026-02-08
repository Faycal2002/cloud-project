from rest_framework import viewsets
from .models import Value
from .serializers import ValueSerializer

class ValueViewSet(viewsets.ModelViewSet):
    queryset = Value.objects.all()
    serializer_class = ValueSerializer
