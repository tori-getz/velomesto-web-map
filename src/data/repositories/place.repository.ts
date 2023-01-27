import { Either, left, right } from "@sweet-monads/either";
import { Failure, ServerFailure } from "~/core/error/failure";
import { PlaceEntity } from "~/domain/entities/place.entity";
import { PlaceRepository } from "~/domain/repositories/point.repository.interface";
import { PlaceDataSource } from "../datasources/place.datasource";

export class PlaceRepositoryImpl implements PlaceRepository{
  public constructor (
    private readonly placeDataSource: PlaceDataSource
  ) {}

  public async getPlaces(
    latitude__gte: number,
    latitude__lte: number,
    longitude__gte: number,
    longitude__lte: number
  ): Promise<Either<Failure, PlaceEntity[]>> {
    try {
      const places = await this.placeDataSource.getPlaces(
        latitude__gte,
        latitude__lte,
        longitude__gte,
        longitude__lte
      );

      return right(places);
    } catch (e: unknown) {
      return left(new ServerFailure());
    }
  }
}
