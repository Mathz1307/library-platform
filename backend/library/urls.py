from django.urls import path
from . import views

urlpatterns = [
    path("api/books/", views.get_books, name="get_books"),
    path("api/books/add", views.add_book, name="add_books"),
    path("api/books/delete", views.delete_book, name="delete_books"),
]