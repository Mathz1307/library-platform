from django.urls import path
from . import views

urlpatterns = [
    path("api/books/", views.get_books, name="get_books"),
]