import { httpClient } from "~/core/networking/http";
import { PlaceEntity } from "~/domain/entities/place.entity";
import { PlaceModel } from "~/data/models/place.model";
import { injectable } from "inversify";
import { PlaceDetailsEntity } from "~/domain/entities/place-details.entity";
import { PlaceDetailsModel } from "../models/place-details.model";

export abstract class PlaceDataSource {
  public abstract getPlaces(
    latitude__gte: number,
    latitude__lte: number,
    longitude__gte: number, 
    longitude__lte: number
  ): Promise<PlaceEntity[]>;

  public abstract getPlaceDetails(id: number): Promise<PlaceDetailsEntity>
}

// я не совснм уверен, что нужно именно так валидировать даные приходящие из api
// но пусть будет так =)
// вроде zod должен выкидывать эксепшены, но я пока только учусь их вылавливать с применением чистой архитектуры

@injectable()
export class PlaceDataSourceImpl implements PlaceDataSource {
  public async getPlaces(
    latitude__gte: number,
    latitude__lte: number,
    longitude__gte: number,
    longitude__lte: number
  ): Promise<PlaceEntity[]> {
    const { data: places } = await httpClient.get<PlaceEntity[]>(`/place/?latitude__gte=${latitude__gte}&latitude__lte=${latitude__lte}&longitude__gte=${longitude__gte}&longitude__lte=${longitude__lte}&limit=100`);

    await PlaceModel.array().parseAsync(places);

    return places;
  }

  public async getPlaceDetails(id: number): Promise<PlaceDetailsEntity> {
    const { data: placeDetails } = await httpClient.get<PlaceDetailsEntity>(`/place/${id}/`);

    await PlaceDetailsModel.parseAsync(placeDetails);

    return placeDetails;
  }
}
