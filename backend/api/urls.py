# api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreateView.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDeleteView.as_view(), name="delete-note"),
    path(
        "communities/", views.CommunityListCreateView.as_view(), name="community-list"
    ),
    path(
        "communities/delete/<int:pk>/",
        views.CommunityDeleteView.as_view(),
        name="delete-community",
    ),
    path(
        "communities/join/<int:community_id>/",
        views.JoinCommunity.as_view(),
        name="join-community",
    ),
    
]
