"""
URL configuration for E_cmp project.

"""
from django.urls import path
from . import views

urlpatterns = [
    path("register/", view=views.register, name="register"),
    path("login/", view=views.login_page, name="login"),
    path("logout/", view=views.logout_page, name="logout"),
    path("prove_identity", view=views.prove_identity, name="prove_identity"),

    path("foget_password/", view=views.fogot_pwd, name="foget_pwd"),
    path("reset_password/<str:id>/", view=views.reset_pwd, name="reset_pwd"),

    path("account/", view=views.account, name="account"),
    path("manage_account/", view=views.manage_account, name="manage_account"),
    path("edit_account/<str:table>/", view=views.edit_account, name="edit_account"),
    path("account_notification/", view=views.account_notification, name="account_notification"),

    path('about/', view=views.about, name="about"),
    path('contact/', view=views.contact, name="contact"),

    path('', view=views.home, name="home"),
    path('shop/', view=views.shop, name="shop"),
    path('categories/', view=views.categories, name="categories"),

    path('item/<str:id>', view=views.item, name="item"),
]

