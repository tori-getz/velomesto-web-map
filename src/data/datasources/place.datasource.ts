import { httpClient } from "~/core/networking/http";
import { PlaceEntity } from "~/domain/entities/place.entity";
import { PlaceModel } from "~/data/models/place.model";

export interface PlaceDataSource {
  getPlaces(
    latitude__gte: number,
    latitude__lte: number,
    longitude__gte: number, 
    longitude__lte: number
  ): Promise<PlaceEntity[]>;
}

export class PlaceDataSourceImpl implements PlaceDataSource {
  public async getPlaces(
    latitude__gte: number,
    latitude__lte: number,
    longitude__gte: number,
    longitude__lte: number
  ): Promise<PlaceEntity[]> {
    const { data: places } = await httpClient.get<PlaceEntity[]>(`/place/?latitude__gte=${latitude__gte}&latitude__lte=${latitude__lte}&longitude__gte=${longitude__gte}&longitude__lte=${longitude__lte}`);

    await PlaceModel.array().parseAsync(places);

    return places;
  }
}
