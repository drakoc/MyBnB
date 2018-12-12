from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from project.api.auth.view import PasswordResetView, PasswordResetValidationView

app_name = 'auth'

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('password-reset/', PasswordResetView.as_view(), name='password_reset'),
    path('password-reset/validate/', PasswordResetValidationView.as_view(), name='password_reset_verify')
]
