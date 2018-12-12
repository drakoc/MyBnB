from django.urls import path
from project.api.property.view import CreateNewPropertyView, GetUpdateDeletePropertyView, GetPropertyByCantonView, \
    FilterView, GetPropertyDescriptionView, AddPropertyToFavoritesView

app_name = 'property'

urlpatterns = [
    path('new/', CreateNewPropertyView.as_view(), name='create_new_property'),
    path('user/<int:pk>', GetUpdateDeletePropertyView.as_view(), name='get_update_delete_property'),
    path('<int:pk>', GetPropertyDescriptionView.as_view(), name='get_property_description'),
    path('bycanton/', GetPropertyByCantonView.as_view(), name='get_property_by_canton'),
    path('filter/', FilterView.as_view(), name='filter_properties'),
    path('favorites/<int:pk>', AddPropertyToFavoritesView.as_view(), name='add_property_to_favorites'),
]
