from ninja import Schema
from datetime import datetime
from pydantic import  EmailStr
from typing import List,Any


class WaitlistsCreateSchema(Schema):
    email:EmailStr
    

class ErrorWaitlistsCreateSchema(Schema):
    email:List[Any]
    
class WaitlistsDetailSchema(Schema):
    id :int
    email:EmailStr
    timestamp:datetime
    updated:datetime

class WaitlistsListSchema(Schema):
    id : int
    email:EmailStr      