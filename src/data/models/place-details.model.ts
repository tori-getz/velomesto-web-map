import { z } from 'zod';

import { PhotoModel } from './photo.model';
import { PlaceModel } from './place.model';

export const PlaceDetailsModel = PlaceModel.extend({
  name: z.string(),
  description: z.string(),
  country: z.string(),
  address: z.string(),
  telephone: z.string(),
  website: z.string(),
  photos: z.array(PhotoModel),
});
