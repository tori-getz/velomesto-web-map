import { Either } from "@sweet-monads/either";
import { inject, injectable } from "inversify";
import { PLACE_REPOSITORY } from "~/core/di/types";
import { Failure } from "~/core/error/failure";
import { UseCase } from "~/core/use-case";
import { PlaceEntity } from "../entities/place.entity";
import { PlaceRepository } from "../repositories/point.repository.interface";

export interface GetPlacesParams {
  latitude__gte: number
  latitude__lte: number
  longitude__gte: number 
  longitude__lte: number
}

@injectable()
export class GetPlaces implements UseCase<PlaceEntity[], GetPlacesParams> {
  @inject(PLACE_REPOSITORY)
  private readonly placeRepository!: PlaceRepository;

  public async run(params: GetPlacesParams): Promise<Either<Failure, PlaceEntity[]>> {
    return this.placeRepository.getPlaces(
      params.latitude__gte,
      params.latitude__lte,
      params.longitude__gte,
      params.longitude__lte,
    );
  }
}
