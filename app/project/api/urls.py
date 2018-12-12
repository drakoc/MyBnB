from django.urls import path, include

app_name = 'api'
urlpatterns = [
    path('registration/', include('project.api.registration.urls'), name='registration'),
    path('auth/', include('project.api.auth.urls'), name='auth'),
    path('users/', include('project.api.users.urls'), name='users'),
    path('property/', include('project.api.property.urls'), name='property')

]
