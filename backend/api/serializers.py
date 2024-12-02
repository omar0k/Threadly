from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Thread, Community


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}


class CommunitySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Community
        fields = ["id", "name", "description", "created_at", "members", "image_url"]

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None
