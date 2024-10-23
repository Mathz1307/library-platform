from django.db import models

# Create your models here.
# Book model
class Book(models.Model):
    name = models.CharField(max_length=512)
    release_date = models.DateField()
    pages = models.BigIntegerField()
    cover = models.ImageField(upload_to='assets/') 
    authors = models.ManyToManyField('Author')
    genres = models.ManyToManyField('Genre')

    def __str__(self):
        return self.name

# Author model
class Author(models.Model):
    name = models.CharField(max_length=512)

    def __str__(self):
        return self.name

# Genre model
class Genre(models.Model):
    name = models.CharField(max_length=512)

    def __str__(self):
        return self.name
