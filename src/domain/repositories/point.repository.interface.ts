import { Either } from "@sweet-monads/either";
import { Failure } from "~/core/error/failure";
import { PlaceEntity } from "~/domain/entities/place.entity";

export abstract class PlaceRepository {
  public abstract getPlaces(
    latitude__gte: number,
    latitude__lte: number,
    longitude__gte: number, 
    longitude__lte: number
  ): Promise<Either<Failure, PlaceEntity[]>>
}
