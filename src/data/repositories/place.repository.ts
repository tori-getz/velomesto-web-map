import { Either, left, right } from "@sweet-monads/either";
import { inject, injectable } from "inversify";
import { PLACE_DATA_SOURCE } from "~/core/di/types";
import { Failure, ServerFailure } from "~/core/error/failure";
import { PlaceDetailsEntity } from "~/domain/entities/place-details.entity";
import { PlaceEntity } from "~/domain/entities/place.entity";
import { PlaceRepository } from "~/domain/repositories/place.abstract-repository";
import type { PlaceDataSource } from "../datasources/place.datasource";

@injectable()
export class PlaceRepositoryImpl implements PlaceRepository {
  @inject(PLACE_DATA_SOURCE)
  private readonly placeDataSource!: PlaceDataSource

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
      return left(new ServerFailure('Failed to fetch places'));
    }
  }

  public async getDetails(id: number): Promise<Either<Failure, PlaceDetailsEntity>> {
    try {
      const placeDetails = await this.placeDataSource.getPlaceDetails(id);

      return right(placeDetails);
    } catch (e: unknown) {
      return left(new ServerFailure('Failed to feth place details'));
    }
  }
}
