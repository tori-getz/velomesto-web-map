export interface Failure extends Error {};

export class ServerFailure extends Error implements Failure {};
