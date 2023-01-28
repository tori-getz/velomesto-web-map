import { useStore } from 'effector-react';
import { useInjection } from 'inversify-react';
import { GET_PLACES, GET_PLACE_DETAILS } from '~/core/di/types';
import { PlaceDetailsEntity } from '~/domain/entities/place-details.entity';
import { PlaceEntity } from '~/domain/entities/place.entity';
import { GetPlaceDetails } from '~/domain/usecases/get-place-details.usecase';
import { GetPlaces } from '~/domain/usecases/get-places.usecase';
import {
  $places,
  updatePlaces
} from '~/presentation/store/place';

interface GetPlacesParams {
  latitude__gte: number,
  latitude__lte: number,
  longitude__gte: number,
  longitude__lte: number
}

interface UsePlaces {
  places: PlaceEntity[]
  getPlaces: (params: GetPlacesParams) => Promise<void>
  getPlaceDetails: (id: number) => Promise<PlaceDetailsEntity>
}

export const usePlaces = (): UsePlaces => {
  const getPlacesUseCase = useInjection<GetPlaces>(GET_PLACES);
  const getPlaceDetailsUseCase = useInjection<GetPlaceDetails>(GET_PLACE_DETAILS);

  const places = useStore($places);

  const getPlaces = async (params: GetPlacesParams) => {
    const placesEither = await getPlacesUseCase.run(params);

    placesEither.mapLeft((err) => alert(err.message));

    placesEither.mapRight(places => {
      updatePlaces(places);
    })
  }

  const getPlaceDetails = async (id: number): Promise<PlaceDetailsEntity> => {
    const placeDetailsEither = await getPlaceDetailsUseCase.run({ id });

    if (placeDetailsEither.isLeft()) {
      throw new Error('Failed to fetch place details');
    }

    return placeDetailsEither.unwrap();
  }

  return {
    places,
    getPlaces,
    getPlaceDetails
  }
}
