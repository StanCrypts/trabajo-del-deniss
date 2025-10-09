# views.py
from rest_framework import viewsets,status
from rest_framework.response import Response
from .models import TurmaModel, AlunoModel
from .serializers import TurmaSerializer, TurmaDetailSerializer, AlunoSerializer

class TurmaViewSet(viewsets.ModelViewSet):
    queryset = TurmaModel.objects.all()

    def get_serializer_class(self):
        if self.action == "retrieve":
            return TurmaDetailSerializer
        return TurmaSerializer


class AlunoViewSet(viewsets.ModelViewSet):
    queryset = AlunoModel.objects.all()
    serializer_class = AlunoSerializer

    def create(self, request, *args, **kwargs):
        # Se for lista, cria em lote
        if isinstance(request.data, list):
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_bulk_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # Caso contrário, cria só 1
        return super().create(request, *args, **kwargs)

    def perform_bulk_create(self, serializer):
        # bulk_create salva vários de uma vez
        AlunoModel.objects.bulk_create([AlunoModel(**item) for item in serializer.validated_data])