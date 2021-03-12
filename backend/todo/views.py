from django.shortcuts import render
from rest_framework import viewsets
from todo.serializers import TodoSerializer
from todo.models import Todo


class TodoViewset(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()