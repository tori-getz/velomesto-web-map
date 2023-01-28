import { useStore } from 'effector-react';
import { useInjection } from 'inversify-react';
import { GET_PLACES } from '~/core/di/types';
import { PlaceEntity } from '~/domain/entities/place.entity';
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
}

export const usePlaces = (): UsePlaces => {
  const getPlacesUseCase = useInjection<GetPlaces>(GET_PLACES);

  const places = useStore($places);

  const getPlaces = async (params: GetPlacesParams) => {
    const nextPlaces = await getPlacesUseCase.run(params);

    nextPlaces.mapLeft((err) => alert(err.message));

    nextPlaces.mapRight(places => {
      updatePlaces(places);
    })
  }

  return {
    places,
    getPlaces,
  }
}
