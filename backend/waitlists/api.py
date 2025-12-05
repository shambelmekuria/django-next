from ninja import Router
from typing import List
import json

from .forms import WaitlistEntryCreateForm
from .models import WaitlistEntry
from .schemas import WaitlistsListSchema, WaitlistsCreateSchema, WaitlistsDetailSchema,ErrorWaitlistsCreateSchema
from django.shortcuts import get_object_or_404
from ninja_jwt.authentication import JWTAuth
import helpers

router = Router()
# To Allow Anonym user
# /api/waitlists/
@router.get("", response=List[WaitlistsListSchema], auth=helpers.api_auth_user_required)
def list_waitlists_entries(request):
    return WaitlistEntry.objects.filter(user=request.user)


# /api/waitlists/
@router.post("", response={
    201: WaitlistsDetailSchema,
     400:ErrorWaitlistsCreateSchema}, auth=helpers.api_auth_user_or_annon)
def create_waitlists_entries(request, data: WaitlistsCreateSchema):
    form = WaitlistEntryCreateForm(data.dict())
    if not form.is_valid():
        form_errors = json.loads(form.errors.as_json())
        return 400, form_errors
    obj = form.save(commit=False)
    if request.user.is_authenticated:
        obj.user = request.user
    obj.save()
    return 201, obj


@router.get("{entry_id}/", response=WaitlistsDetailSchema)
def get_waitlist_entries(request, entry_id: int):
    qs = get_object_or_404(WaitlistEntry, id=entry_id, user=request.user)
    return qs
