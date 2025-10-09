from django.db import models

# Create your models here.
class TurmaModel(models.Model):
    nome_curso = models.CharField(max_length=100)
    nome_turma = models.CharField(max_length=100)
    nome_professor = models.CharField(max_length=100)
    data_inicio = models.DateField()
    data_fim = models.DateField()

    def __str__(self):
        return self.nome
    
class AlunoModel(models.Model):
    nome = models.CharField(max_length=100)
    idade = models.IntegerField()
    turma = models.ForeignKey(TurmaModel, on_delete=models.CASCADE)