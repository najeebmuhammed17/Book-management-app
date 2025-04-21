from django.shortcuts import render
from rest_framework import viewsets, generics
from .models import Book
from .serializers import BookSerializer, UserSerializer
from rest_framework.permissions import AllowAny


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class BookViewSet(viewsets.ModelViewSet):        # 	Handles crud  API for books 
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class RegisterView(generics.CreateAPIView):        #API for user registration
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):     # Add custom claims   returns JWT tokens with extra info


    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_superuser

        return token

class MyTokenObtainPairView(TokenObtainPairView):      # Custom Token View using the new serializer
    serializer_class = MyTokenObtainPairSerializer
