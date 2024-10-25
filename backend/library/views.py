from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Book, Author, Genre
from .serializers import BookSerializer, AuthorSerializer, GenreSerializer
import os

@api_view(['GET'])
def get_books(request):
    """Returns information of all books in the database"""
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

@api_view(['POST'])
def add_book(request):
    """Adds a new book to the database"""
    data = request.data
    try:
        # Get authors and genres names
        authors = data["authors"]
        genres = data["genres"]

        # See if authors and genres are already in db
        authors_ids = []
        for author in authors:
            author_object = Author.objects.get_or_create(name=author["name"])[0]
            author_data = AuthorSerializer(author_object, many=False).data
            authors_ids.append(author_data["id"])
        

        genres_ids = []
        for genre in genres:
            genre_object = Genre.objects.get_or_create(name=genre["name"])[0]
            genre_data = GenreSerializer(genre_object, many=False).data
            genres_ids.append(genre_data["id"])
        
        # Change names for ids
        data["authors"] = authors_ids
        data["genres"] = genres_ids

        # Insert book in database
        serializer = BookSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"exception": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def delete_book(request):
    """Removes book from the database"""
    data = request.data
    print(data)
    try:
        title = data["name"]
        authors = data["authors"]

        # Only need id of one of the authors (apparently)
        author = authors[0]
        author_object = Author.objects.get(name=author["name"])
        author_id = AuthorSerializer(author_object, many=False).data["id"]

        # Find book in db
        book = Book.objects.get(name=title, authors=author_id)
        #cover_path = book.data["cover"]
        book.delete()
        
        #os.remove(cover_path)
    
        return Response({"message": f"Book {title} was deleted successfully"}, status=status.HTTP_200_OK)
    
    except Book.DoesNotExist or Author.DoesNotExist:
        return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        return Response({"exception": str(e)}, status=status.HTTP_400_BAD_REQUEST)