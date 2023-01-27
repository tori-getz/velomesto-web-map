import { Either } from "@sweet-monads/either";
import { injectable } from "inversify";
import { Failure } from "~/core/error/failure";
import { UseCase } from "~/core/use-case";
import { PlaceEntity } from "../entities/place.entity";

export interface GetPlacesParams {
  latitude__gte: number
  latitude__lte: number
  longitude__gte: number 
  longitude__lte: number
}

@injectable()
export class GetPlaces implements UseCase<PlaceEntity[], GetPlacesParams> {
  public async call(params: GetPlacesParams): Promise<Either<Failure, PlaceEntity[]>> {
    throw new Error("Method not implemented.");
  }
}
