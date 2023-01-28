import { z } from 'zod';

export const PhotoModel = z.object({
  image_big: z.string(),
  image_thumb: z.string()
});
