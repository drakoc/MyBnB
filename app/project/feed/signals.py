from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from project.feed.models import UserProfile

User = get_user_model()


@receiver(post_save, sender=User)
def my_handler(**kwargs):
    user = kwargs.get('instance')
    UserProfile.objects.get_or_create(
        user=user
    )
