from ninja import Router
from typing import List
from .models import WaitlistEntry
from .schemas import WaitlistsListSchema,WaitlistsCreateSchema,WaitlistsDetailSchema
from django.shortcuts import get_object_or_404
from ninja_jwt.authentication import JWTAuth
router = Router()

@router.get('',response=List[WaitlistsListSchema],auth=JWTAuth())
def list_waitlist_entries(request):
    return WaitlistEntry.objects.all()

@router.get("{entry_id}/",response=WaitlistsDetailSchema)
def get_waitlist_entries(request,entry_id:int):
    qs = get_object_or_404(WaitlistEntry,id=entry_id)
    return qs