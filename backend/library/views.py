from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Book, Author, Genre
from .serializers import BookSerializer, AuthorSerializer, GenreSerializer

@api_view(['GET'])
def get_books(request):
    books = Book.objects.all()
    books_data = BookSerializer(books, many=True).data

    authors_id = [tuple(books_data[i]["authors"]) for i in range(len(books_data))]
    genres_id = [tuple(books_data[i]["authors"]) for i in range(len(books_data))]

    for i in range(len(authors_id)):
        authors = Author.objects.filter(id__in=authors_id[i])
        authors_data = AuthorSerializer(authors, many=True).data

        books_data[i]["authors"] = authors_data

    for i in range(len(genres_id)):
        genres = Genre.objects.filter(id__in=genres_id[i])
        genres_data = GenreSerializer(genres, many=True).data

        books_data[i]["genres"] = genres_data
    

    return Response(books_data)
