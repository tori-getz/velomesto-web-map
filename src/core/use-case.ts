import { Either } from "@sweet-monads/either";
import { Failure } from "./error/failure";

export abstract class UseCase<Type, Params> {
  public abstract run(params: Params): Promise<Either<Failure, Type>>;
}
