from django.db import models
from django.utils.translation import gettext_lazy as _ 
from django.conf import settings

User = settings.AUTH_USER_MODEL # Recommeded approache may Model modified

# Create your models here.

class WaitlistEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True,default=None)
    email = models.EmailField(_("Email"), max_length=254)
    timestamp = models.DateTimeField(_("Time Stamp"),  auto_now_add=True)
    updated = models.DateTimeField(_("Updated"), auto_now=True)

    

    class Meta:
        verbose_name = _("WaitlistEntry")
        verbose_name_plural = _("WaitlistEntrys")

    def __str__(self):
        return self.email

