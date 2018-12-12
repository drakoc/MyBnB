from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from project.api.auth.serializers import PasswordResetSerializer, PasswordResetValidationSerializer


class PasswordResetView(GenericAPIView):
    serializer_class = PasswordResetSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(serializer.validated_data)
        return Response('Email to reset your password has been sent')


class PasswordResetValidationView(GenericAPIView):
    serializer_class = PasswordResetValidationSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(serializer.validated_data)
        return Response(f'Your new password is set')
