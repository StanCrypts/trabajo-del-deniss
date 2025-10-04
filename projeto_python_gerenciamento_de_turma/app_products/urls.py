from django.urls import path
from django.shortcuts import render
from .views import TurmaViewSet, AlunoViewSet

turma_list = TurmaViewSet.as_view({"get": "list", "post": "create"})
turma_detail = TurmaViewSet.as_view({"get": "retrieve", "put": "update", "delete": "destroy"})

aluno_list = AlunoViewSet.as_view({"get": "list", "post": "create"})
aluno_detail = AlunoViewSet.as_view({"get": "retrieve", "put": "update", "delete": "destroy"})

def root_redirect(request):
    return render(request, "index.html")

urlpatterns = [
    path("", root_redirect, name="root"),

    # Turmas
    path("api/turma/", turma_list, name="turma-list"),
    path("api/turma/<int:pk>/", turma_detail, name="turma-detail"),

    # Alunos (sem depender da turma na URL)
    path("api/alunos/", aluno_list, name="aluno-list"),
    path("api/alunos/<int:pk>/", aluno_detail, name="aluno-detail"),
]
