import { Container } from "inversify";
import { PlaceDataSource, PlaceDataSourceImpl } from "~/data/datasources/place.datasource";
import { PlaceRepositoryImpl } from "~/data/repositories/place.repository";
import { PlaceRepository } from "~/domain/repositories/point.repository.interface";
import { GetPlaces } from "~/domain/usecases/get-places.usecase";
import { GET_PLACES, PLACE_DATA_SOURCE, PLACE_REPOSITORY } from "./types";

const container = new Container();

// use cases
container.bind<GetPlaces>(GET_PLACES).to(GetPlaces);

// repositories
container.bind<PlaceRepository>(PLACE_REPOSITORY).to(PlaceRepositoryImpl);

// data sources 
container.bind<PlaceDataSource>(PLACE_DATA_SOURCE).to(PlaceDataSourceImpl);

export { container };
