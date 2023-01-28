import { z } from 'zod';

export const PlaceModel = z.object({
  id: z.number(),
  latitude: z.number(),
  longitude: z.number(),
});
