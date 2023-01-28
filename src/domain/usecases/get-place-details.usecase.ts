import { Either } from "@sweet-monads/either";
import { inject, injectable } from "inversify";
import { PLACE_REPOSITORY } from "~/core/di/types";
import { Failure } from "~/core/error/failure";
import { UseCase } from "~/core/use-case";
import { PlaceDetailsEntity } from "../entities/place-details.entity";
import { PlaceRepository } from "../repositories/place.repository.interface";

export interface GetPlaceDetailsParams {
  id: number
}

@injectable()
export class GetPlaceDetails implements UseCase<PlaceDetailsEntity, GetPlaceDetailsParams> {
  @inject(PLACE_REPOSITORY)
  private readonly placeRepository!: PlaceRepository

  public run(params: GetPlaceDetailsParams): Promise<Either<Failure, PlaceDetailsEntity>> {
    return this.placeRepository.getDetails(params.id);
  }
}
