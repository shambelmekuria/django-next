from django.urls import path
from .api import api

path("me/", api.urls)