from django.contrib import admin

from project.feed.models import UserProfile, PropProfile, RenterProfile, Favorites


class UserProfileAdmin(admin.ModelAdmin):
    def username(self, instance):
        return instance.user.username

    def first_name(self, instance):
        return instance.user.first_name

    def last_name(selfself, instance):
        return instance.user.last_name

    list_display = ['username', 'first_name', 'last_name']


class PropProfileAdmin(admin.ModelAdmin):
    def id(self, instance):
        return instance.user.id

    def username(self, instance):
        return instance.user.username

    def first_name(self, instance):
        return instance.user.first_name

    def last_name(selfself, instance):
        return instance.user.last_name

    list_display = ['id', 'username', 'first_name', 'last_name']


class RenterProfileAdmin(admin.ModelAdmin):
    def username(self, instance):
        return instance.user.username

    def first_name(self, instance):
        return instance.user.first_name

    def last_name(selfself, instance):
        return instance.user.last_name

    list_display = ['username', 'first_name', 'last_name']


class FavoritesAdmin(admin.ModelAdmin):
    def username(self, instance):
        return instance.user.username

    def first_name(self, instance):
        return instance.user.first_name

    def last_name(selfself, instance):
        return instance.user.last_name

    list_display = ['username', 'first_name', 'last_name']


admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(PropProfile, PropProfileAdmin)
admin.site.register(RenterProfile, RenterProfileAdmin)
admin.site.register(Favorites, FavoritesAdmin)
