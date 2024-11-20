# api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("threads/", views.ThreadListCreateView.as_view(), name="thread-list"),
    path(
        "threads/delete/<int:pk>/",
        views.ThreadDeleteView.as_view(),
        name="delete-thread",
    ),
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
    path(
        "communities/leave/<int:community_id>/",
        views.LeaveCommunity.as_view(),
        name="leave-community",
    ),
    path(
        "communities/<int:community_id>/threads/",
        views.CommunityThreadsView.as_view(),
        name="community-threads",
    ),
]
