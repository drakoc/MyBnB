from django.contrib.auth.models import User
from django.db import models

from project.api.helpers.constants import CANTONS, GENDER
from project.api.helpers.functions import code_generator


class UserProfile(models.Model):
    user = models.OneToOneField(
        User,
        related_name='profile',
        on_delete=models.CASCADE
    )

    street = models.CharField(
        verbose_name='street',
        max_length=30
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
        max_length=20
    )

    canton = models.CharField(
        verbose_name='canton',
        max_length=2,
        choices=CANTONS
    )

    date_of_birth = models.DateField(
        verbose_name='date of birth',
        null=True
    )

    gender = models.CharField(
        verbose_name='gender',
        max_length=6,
        choices=GENDER
    )

    about = models.TextField(
        verbose_name='about'
    )

    occupation = models.CharField(
        verbose_name='occupation',
        max_length=30
    )

    image = models.ImageField()

    registration_code = models.CharField(
        verbose_name='registration_code',
        max_length=6,
        default=code_generator,
    )

    def __str__(self):
        return '{} {}'.format(self.user.first_name, self.user.last_name)
