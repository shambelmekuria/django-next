from ninja import Schema
from datetime import datetime
from pydantic import  EmailStr


class WaitlistsCreateSchema(Schema):
    email:EmailStr
    
class WaitlistsDetailSchema(Schema):
    id :int
    email:EmailStr
    timestamp:datetime
    updated:datetime

class WaitlistsListSchema(Schema):
    id : int
    email:EmailStr      