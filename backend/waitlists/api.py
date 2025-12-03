from ninja import Router
from typing import List
from .models import WaitlistEntry
from .schemas import WaitlistsListSchema,WaitlistsCreateSchema,WaitlistsDetailSchema
from django.shortcuts import get_object_or_404
from ninja_jwt.authentication import JWTAuth
import helpers
router = Router()
# To Allow Anonym user



# /api/waitlists/
@router.get('',response=List[WaitlistsListSchema],auth=helpers.api_auth_user_required)
def list_waitlist_entries(request):
    return WaitlistEntry.objects.filter(user=request.user)

# /api/waitlists/
@router.post('',response=WaitlistsDetailSchema,auth=helpers.api_auth_user_or_annon)
def create_waitlist_entries(request,data:WaitlistsCreateSchema):
    obj = WaitlistEntry.objects.create(**data.dict())
    for x in range(1,20):
        print("user",request.user.is_authenticated)
    if request.user.is_authenticated:
        obj.user = request.user
    obj.save()
    return obj

@router.get("{entry_id}/",response=WaitlistsDetailSchema)
def get_waitlist_entries(request,entry_id:int):
    qs = get_object_or_404(WaitlistEntry,id=entry_id,user=request.user)
    return qs

