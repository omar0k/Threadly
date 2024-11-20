from django.contrib import admin
from .models import Community


# Register your models here.
@admin.register(Community)
class CommunityAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
        "created_at",
        "list_members",
    )  # Customize columns
    search_fields = ("name", "description")  # Add search functionality

    def list_members(self, obj):
        return ", ".join([member.username for member in obj.members.all()])

    list_members.short_description = "Members"

    list_filter = ("created_at",)  # Add filtering options
