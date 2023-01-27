import { Either } from "@sweet-monads/either";
import { Failure } from "./error/failure";

export interface UseCase<Type, Params> {
  call(params: Params): Promise<Either<Failure, Type>>;
}
