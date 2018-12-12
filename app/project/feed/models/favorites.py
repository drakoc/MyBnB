from django.contrib.auth.models import User
from django.db import models

from project.feed.models import PropProfile


class Favorites(models.Model):
    user = models.ForeignKey(
        User,
        related_name='favorite',
        null=True,
        on_delete=models.CASCADE
    )

    propprofile = models.ForeignKey(
        PropProfile,
        related_name='favored',
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name_plural = 'Favorites'
        unique_together = [
            ('user', 'propprofile')
        ]
