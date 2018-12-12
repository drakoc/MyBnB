from django.contrib.auth.models import User
from django.db import models

from project.api.helpers.constants import BATHROOM, RENTAL_PERIOD, PROPERTY_TYPE, ROOMS, CANTONS


class PropProfile(models.Model):
    user = models.OneToOneField(
        User,
        related_name='house',
        on_delete=models.CASCADE
    )

    street = models.CharField(
        verbose_name='street',
        max_length=30,
        blank=False
    )

    street_number = models.IntegerField(
        verbose_name='street number',
        null=True
    )

    post_number = models.IntegerField(
        verbose_name='post number',
        null=True
    )

    city = models.CharField(
        verbose_name='city',
        max_length=25,
        blank=False
    )

    canton = models.CharField(
        verbose_name='canton',
        max_length=2,
        blank=False,
        choices=CANTONS
    )

    sqm = models.IntegerField(
        verbose_name='square meters',
        null=True
    )

    rooms = models.CharField(
        verbose_name='number of rooms',
        max_length=2,
        choices=ROOMS
    )

    bathroom = models.CharField(
        verbose_name='bathroom',
        max_length=8,
        choices=BATHROOM
    )

    pets = models.BooleanField(
        verbose_name='pets',
        max_length=30
    )

    rental_period = models.CharField(
        verbose_name='rent period',
        max_length=10,
        choices=RENTAL_PERIOD
    )

    balcony = models.BooleanField(
        verbose_name='balcony',
        default=False
    )

    elevator = models.BooleanField(
        verbose_name='elevator',
        default=False
    )

    housing_type = models.CharField(
        verbose_name='type of property',
        max_length=10,
        choices=PROPERTY_TYPE
    )

    guests_allowed = models.BooleanField(
        verbose_name='guests allowed',
        default=False,
    )

    smoking = models.BooleanField(
        verbose_name='smoking allowed',
        default=False
    )

    photo1 = models.ImageField()

    photo2 = models.ImageField(
        blank=True
    )

    photo3 = models.ImageField(
        blank=True
    )

    photo4 = models.ImageField(
        blank=True
    )

    photo5 = models.ImageField(
        blank=True
    )

    photo6 = models.ImageField(
        blank=True
    )

    photo7 = models.ImageField(
        blank=True
    )

    photo8 = models.ImageField(
        blank=True
    )

    photo9 = models.ImageField(
        blank=True
    )

    photo10 = models.ImageField(
        blank=True
    )

    active = models.BooleanField(
        default=False
    )

    class Meta:
        verbose_name = 'Property'
        verbose_name_plural = 'Properties'
