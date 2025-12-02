from ninja import NinjaAPI
from ninja_extra import NinjaExtraAPI
from .schemas import UserSchema
from ninja_jwt.authentication import JWTAuth
from ninja_jwt.controller import NinjaJWTDefaultController

api = NinjaExtraAPI() # Import from ninja extra not ninja
api.register_controllers(NinjaJWTDefaultController)

# import routers from each apps
api.add_router('/waitlist/','waitlists.api.router')

# auth = jwtAuth means in django @loginrequired
@api.get('me/',response=UserSchema,auth=JWTAuth())
def me(request):
    return request.user