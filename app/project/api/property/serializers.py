from rest_framework import serializers

from project.api.helpers.constants import BATHROOM, ROOMS, RENTAL_PERIOD, PROPERTY_TYPE, CANTONS
from project.api.users.serializers import UserSerializer
from project.feed.models import PropProfile


class PropertyDescriptionSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = PropProfile()
        fields = '__all__'


class PropertySerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = PropProfile
        fields = '__all__'
        read_only_fields = ['id', 'user']

    def create(self, validated_data):
        user = self.context.get('request').user
        if hasattr(user, 'house'):
            raise serializers.ValidationError('Property already exist')
        return PropProfile.objects.create(
            **validated_data,
            user=self.context.get('request').user
        )


class FilterSerilizer(serializers.Serializer):
    canton = serializers.ChoiceField(
        choices=CANTONS,
        required=False
    )

    rooms = serializers.ChoiceField(
        choices=ROOMS,
        required=False
    )
    sqm_start = serializers.IntegerField(
        max_value=400,
        min_value=50,
        default=50,
    )
    sqm_end = serializers.IntegerField(
        max_value=400,
        min_value=50,
        default=400,
    )

    bathroom = serializers.ChoiceField(
        choices=BATHROOM,
        required=False
    )

    rental_period = serializers.ChoiceField(
        choices=RENTAL_PERIOD,
        required=False
    )

    balcony = serializers.NullBooleanField(
        required=False,

    )

    elevator = serializers.NullBooleanField(
        required=False,
    )

    housing_type = serializers.ChoiceField(
        choices=PROPERTY_TYPE,
        required=False
    )

    guests_allowed = serializers.NullBooleanField(
        required=False,

    )

    smoking = serializers.NullBooleanField(
        required=False,
    )
