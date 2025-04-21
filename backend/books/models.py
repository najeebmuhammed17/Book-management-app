from django.db import models

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    genre = models.CharField(max_length=100)
    published_year = models.PositiveIntegerField()
    isbn = models.CharField(max_length=13, blank=True, null=True)
    available = models.BooleanField(default=True)

    def __str__(self):
        return self.title