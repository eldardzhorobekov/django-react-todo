from django.contrib import admin
from todo.models import Todo


class TodoAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'description', 'completed', 'id')


admin.site.register(Todo, TodoAdmin)