from django.urls import path
from rest_framework import routers
from todo.views import TodoViewset

router = routers.DefaultRouter()
router.register(r'todos', TodoViewset, basename='todo')

urlpatterns = router.urls
