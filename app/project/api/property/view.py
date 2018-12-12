from rest_framework.generics import GenericAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from project.api.permissions import IsUserOrReadOnly
from project.api.property.serializers import PropertySerializer, FilterSerilizer, PropertyDescriptionSerializer
from project.feed.models import PropProfile, Favorites
from project.api.base import GetObjectMixin


class GetPropertyDescriptionView(RetrieveAPIView):
    serializer_class = PropertyDescriptionSerializer
    queryset = PropProfile.objects.all()


class CreateNewPropertyView(GenericAPIView):
    serializer_class = PropertySerializer
    permission_classes = [
        IsAuthenticated,
        IsUserOrReadOnly
    ]

    def post(self, request):
        serializer = self.get_serializer(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        property = serializer.create(serializer.validated_data)
        return Response(PropertySerializer(property).data)


class GetUpdateDeletePropertyView(GenericAPIView):
    queryset = PropProfile.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [
        IsAuthenticated,
        IsUserOrReadOnly
    ]

    def get(self, request, **kwargs):
        property = self.get_object()
        serializer = self.get_serializer(property)
        return Response(serializer.data)

    def post(self, request, **kwargs):
        property = self.get_object()
        serializer = self.get_serializer(property, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, **kwargs):
        property = self.get_object()
        property.delete()
        return Response('Property has been deleted')


class GetPropertyByCantonView(ListAPIView):
    serializer_class = PropertySerializer
    queryset = PropProfile.objects.all()
    permission_classes = [IsAuthenticated]

    def filter_queryset(self, queryset):
        canton = self.request.query_params.get('canton')
        queryset = queryset.filter(canton=canton)
        return queryset


class FilterView(APIView):

    def post(self, request, **kwargs):
        serializer = FilterSerilizer(data=request.data)
        serializer.is_valid(raise_exception=True)
        sqm_start = serializer.validated_data.pop('sqm_start')
        sqm_end = serializer.validated_data.pop('sqm_end')
        queryset = PropProfile.objects.filter(
            **serializer.validated_data,
            sqm__gte=sqm_start,
            sqm__lte=sqm_end,
        )
        return Response(PropertySerializer(queryset, many=True).data)


class AddPropertyToFavoritesView(GetObjectMixin, GenericAPIView):
    serializer_class = PropertySerializer
    queryset = PropProfile.objects.all()

    def post(self, request, **kwargs):
        prop_profile = self.get_object()
        Favorites.objects.get_or_create(
            user=request.user,
            propprofile=prop_profile
        )
        return Response('Property added to favorites')

    def delete(self, request, **kwargs):
        prop_profile = self.get_object()
        favorite = self.get_object_by_model(Favorites, propprofile=prop_profile, user=request.user)
        favorite.delete()
        return Response('Removed from favorites')
