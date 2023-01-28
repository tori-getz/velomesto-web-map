export class EnvConfig {
  static apiUrl: string = process.env.NEXT_PUBLIC_API_URL as string;
  static mapboxAccessToken: string = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
}
