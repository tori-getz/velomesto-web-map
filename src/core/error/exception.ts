export interface Exception extends Error {};

export class ServerException extends Error implements Exception {};
