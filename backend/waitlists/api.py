from ninja import Router
from typing import List
from .models import WaitlistEntry
from .schemas import WaitlistsListSchema,WaitlistsCreateSchema,WaitlistsDetailSchema
from django.shortcuts import get_object_or_404

router = Router()

@router.get('',response=List[WaitlistsListSchema])
def list_waitlist_entries(request):
    return WaitlistEntry.objects.all()

@router.get("{entry_id}/",response=WaitlistsDetailSchema)
def get_waitlist_entries(request,entry_id:int):
    qs = get_object_or_404(WaitlistEntry,id=entry_id)
    return qs