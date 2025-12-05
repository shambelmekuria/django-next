from typing import Any
from django import forms
from .models import WaitlistEntry
from django.utils import timezone

class WaitlistEntryCreateForm(forms.ModelForm):
    class Meta:
        model = WaitlistEntry
        fields =['email']
    def clean_email(self):
        email = self.cleaned_data.get("email")
        today = timezone.now().date()
        qs = WaitlistEntry.objects.filter(
            email=email,
            timestamp__date=today 
        )
        if qs.count() >=2:
            raise forms.ValidationError("Can`t enter this email again today")
        return email
    
    

    