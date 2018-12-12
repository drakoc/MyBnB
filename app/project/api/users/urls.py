from django.urls import path

from project.api.users.view import GetUpdateUserProfileView, GetFavoritesPropertiesView

app_name = 'users'

urlpatterns = [
    path('me/', GetUpdateUserProfileView.as_view(), name='user_profile'),
    path('me/favorites/', GetFavoritesPropertiesView.as_view(), name='user_favorites_properties')
]
