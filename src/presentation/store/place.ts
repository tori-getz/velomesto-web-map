import { $placeDomain } from "~/core/store";
import { PlaceEntity } from "~/domain/entities/place.entity";

export const updatePlaces = $placeDomain.createEvent<PlaceEntity[]>('update places');

export const $places = $placeDomain.createStore<PlaceEntity[]>([], { name: 'places list' })
  .on(updatePlaces, (_, places) => places);
