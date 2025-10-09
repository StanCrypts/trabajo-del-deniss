from rest_framework import serializers
from .models import TurmaModel, AlunoModel

class AlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlunoModel
        fields = "__all__"


class TurmaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TurmaModel
        fields = "__all__"


class TurmaDetailSerializer(serializers.ModelSerializer):
    alunos = AlunoSerializer(many=True, read_only=True, source="alunomodel_set")

    class Meta:
        model = TurmaModel
        fields = "__all__"
