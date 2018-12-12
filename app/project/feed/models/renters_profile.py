from django.contrib.auth.models import User
from django.db import models


class RenterProfile(models.Model):
    user = models.OneToOneField(
        User,
        related_name='renter_profile',
        on_delete=models.CASCADE
    )

    help_wanted = models.TextField(
        verbose_name='type of help',
        blank=False
    )
