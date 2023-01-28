import { Either } from "@sweet-monads/either";
import { Failure } from "~/core/error/failure";
import { PlaceEntity } from "~/domain/entities/place.entity";
import { PlaceDetailsEntity } from "../entities/place-details.entity";

export abstract class PlaceRepository {
  public abstract getPlaces(
    latitude__gte: number,
    latitude__lte: number,
    longitude__gte: number, 
    longitude__lte: number
  ): Promise<Either<Failure, PlaceEntity[]>>

  public abstract getDetails(id: number): Promise<Either<Failure, PlaceDetailsEntity>>
}
