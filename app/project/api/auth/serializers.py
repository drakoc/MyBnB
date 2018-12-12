from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage
from rest_framework import serializers

from project.api.helpers.functions import code_generator

User = get_user_model()


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(
        label='Registration E-mail'
    )

    def validate_email(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError('This email is not registered')

    @staticmethod
    def send_password_reset_email(email, code):
        message = EmailMessage(
            subject='Housing for Help - password reset',
            body=f'This is your link to finish password change '
                 f'http://drakoc.info/registration/validate/?email={email}&code={code}',
            to=[email],
        )
        message.send()

    def save(self, validated_data):
        user = validated_data.get('email')
        code = code_generator()
        user.profile.registration_code = code
        user.profile.save()
        self.send_password_reset_email(
            email=user.email,
            code=code
        )
        return user


class PasswordResetValidationSerializer(PasswordResetSerializer):
    code = serializers.CharField(
        label='Validation code',
        write_only=True,
        max_length=6
    )
    password = serializers.CharField(
        label='Password',
        write_only=True
    )
    password_repeat = serializers.CharField(
        label='Repeat password',
        write_only=True
    )

    def validate(self, data):
        user = data.get('email')
        if data.get('password') != data.get('password_repeat'):
            raise serializers.ValidationError(
                {'password_repeat': 'Passwords do not match!'},
                {'password': 'Passwords do not match!'},
            )
        if data.get('code') != user.profile.registration_code:
            raise serializers.ValidationError({
                'code': 'Wrong validation code!'
            })
        return data

    def save(self, validated_data):
        user = validated_data.get('email')
        user.set_password(validated_data.get('password'))
        user.save()
        user.profile.registration_code = "0"
        user.profile.save()
        return user
