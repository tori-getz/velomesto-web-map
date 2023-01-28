import { PhotoEntity } from "./photo.entity";
import { PlaceEntity } from "./place.entity";

export interface PlaceDetailsEntity extends PlaceEntity {
  name: string
  description: string
  country: string;
  address: string;
  telephone: string
  website: string
  photos: Array<PhotoEntity>
}
