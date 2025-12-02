from django.db import models
from django.utils.translation import gettext_lazy as _ 


# Create your models here.

class WaitlistEntry(models.Model):
    email = models.EmailField(_("Email"), max_length=254)
    timestamp = models.DateTimeField(_("Time Stamp"),  auto_now_add=True)
    updated = models.DateTimeField(_("Updated"), auto_now=True)

    

    class Meta:
        verbose_name = _("WaitlistEntry")
        verbose_name_plural = _("WaitlistEntrys")

    def __str__(self):
        return self.email

