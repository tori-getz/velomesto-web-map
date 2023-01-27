import { Either, left, right } from "@sweet-monads/either";
import { inject, injectable } from "inversify";
import { PLACE_DATA_SOURCE } from "~/core/di/types";
import { Failure, ServerFailure } from "~/core/error/failure";
import { PlaceEntity } from "~/domain/entities/place.entity";
import { PlaceRepository } from "~/domain/repositories/point.repository.interface";
import type { PlaceDataSource } from "../datasources/place.datasource";

@injectable()
export class PlaceRepositoryImpl implements PlaceRepository{
  public constructor (
    @inject(PLACE_DATA_SOURCE) private readonly placeDataSource: PlaceDataSource
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
