from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..models import Community
from ..serializers import CommunitySerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class CommunityListCreateView(generics.ListCreateAPIView):
    serializer_class = CommunitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Community.objects.filter(members=self.request.user)

    def perform_create(self, serializer):
        community = serializer.save()
        community.members.add(self.request.user)


class JoinCommunity(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, community_id):
        try:
            # Get the community by ID
            community = Community.objects.get(id=community_id)
            # Check if user is already in community
            if request.user in community.members.all():
                return Response(
                    {"message": "You are already a member of this community."},
                    status=400,
                )
            # Add the logged-in user to the community
            community.members.add(request.user)

            return Response(
                {"message": "Successfully joined the community"}, status=200
            )
        except Community.DoesNotExist:
            return Response({"error": "Community not found"}, status=404)


class CommunityDeleteView(generics.DestroyAPIView):
    serializer_class = CommunitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Community.objects.filter(members=self.request.user)
