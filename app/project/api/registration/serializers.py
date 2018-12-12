from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage
from rest_framework import serializers

from project.api.helpers.constants import CANTONS, GENDER

User = get_user_model()


class RegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField(
        label='Registration e-mail address'
    )

    def validate_email(self, email):
        try:
            User.objects.get(email=email)
            raise serializers.ValidationError('User with this email already exist!')
        except User.DoesNotExist:
            return email

    @staticmethod
    def send_registration_email(email, code):
        message = EmailMessage(
            subject='Welcome to Housing for Help registration',
            body=f'This is your link to finish registration '
                 f'http://drakoc.info/registration/validate/?email={email}&code={code}',
            to=[email],
        )
        message.send()

    def save(self, validated_data):
        email = validated_data.get('email')
        new_user = User.objects.create_user(
            username=email,
            email=email,
            is_active=False
        )
        self.send_registration_email(
            email=email,
            code=new_user.profile.registration_code,
        )
        return new_user


class RegistrationValidationSerializer(serializers.Serializer):
    first_name = serializers.CharField(
        label='First Name'
    )
    last_name = serializers.CharField(
        label='First Name'
    )
    street = serializers.CharField(
        label='Street'
    )
    street_number = serializers.IntegerField(
        label='street number'
    )
    post_number = serializers.IntegerField(
        label='Post No.'
    )
    city = serializers.CharField(
        label='City'
    )
    canton = serializers.ChoiceField(
        label='Canton',
        choices=CANTONS
    )
    date_of_birth = serializers.DateField(
        label='Date of birth'
    )
    gender = serializers.ChoiceField(
        label='Gender',
        choices=GENDER
    )
    about = serializers.CharField(
        label='About'
    )
    occupation = serializers.CharField(
        label='Occupation'
    )
    email = serializers.EmailField(
        label='email'
    )
    code = serializers.CharField(
        label='code',
        write_only=True
    )
    password = serializers.CharField(
        label='password',
        write_only=True
    )
    password_repeat = serializers.CharField(
        label='password_repeat',
        write_only=True
    )

    def validate_email(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError('This email is not valid!')

    def validate(self, data):
        user = data.get('email')
        if data.get('password') != data.get('password_repeat'):
            raise serializers.ValidationError({
                'password_repeat': 'Passwords do not match!'
            })

        if data.get('code') != user.profile.registration_code or user.is_active:
            raise serializers.ValidationError({
                'code': 'Wrong code or already validated!'
            })
        return data

    def save(self, validated_data):
        user = validated_data.get('email')
        user.first_name = validated_data.get('first_name')
        user.last_name = validated_data.get('last_name')
        user.profile.street = validated_data.get('street')
        user.profile.street_number = validated_data.get('street_number')
        user.profile.post_number = validated_data.get('post_number')
        user.profile.city = validated_data.get('city')
        user.profile.canton = validated_data.get('canton')
        user.profile.date_of_birth = validated_data.get('date_of_birth')
        user.profile.gender = validated_data.get('gender')
        user.profile.about = validated_data.get('about')
        user.profile.occupation = validated_data.get('occupation')
        user.profile.registration_code = "0"
        user.is_active = True
        user.set_password(validated_data.get('password'))
        user.save()
        user.profile.save()
        return user
