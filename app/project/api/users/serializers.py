from django.contrib.auth import get_user_model
from rest_framework import serializers

from project.api.helpers.constants import GENDER, CANTONS
from project.feed.models import UserProfile, RenterProfile, PropProfile

User = get_user_model()


class RenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = RenterProfile
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    renter_profile = RenterSerializer()
    favorites = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'profile', 'renter_profile', 'favorites']

    def get_favorites(self, user):
        properties_list = PropProfile.objects.filter(favored__user=user)
        favorites = [property.id for property in properties_list]
        return favorites


class UserProfileUpdateSerializer(serializers.Serializer):
    first_name = serializers.CharField(
        label='First Name'
    )
    last_name = serializers.CharField(
        label='First Name',
    )
    street = serializers.CharField(
        label='Street',
        max_length=30
    )
    street_number = serializers.IntegerField(
        label='street number'
    )
    post_number = serializers.IntegerField(
        label='Post No.'
    )
    city = serializers.CharField(
        label='City',
        max_length=20
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
        label='Occupation',
        max_length=30
    )
    email = serializers.EmailField(
        label='email'
    )
    help_wanted = serializers.CharField(
        label='Help wanted',
        allow_blank=True,
        required=False
    )

    def validate_email(self, email):
        current_user = self.context.get('request').user
        user = User.objects.get(email=email)
        if user.email != current_user.email:
            raise serializers.ValidationError('This email is already registered!')
        else:
            return email

    def save(self, validated_data):
        user = self.context.get('request').user

        user.email = validated_data.get('email')
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
        help_wanted = validated_data.get('help_wanted')
        if help_wanted is not None:
            user.renter_profile.help_wanted = help_wanted
            user.renter_profile.save()
        user.save()
        user.profile.save()
