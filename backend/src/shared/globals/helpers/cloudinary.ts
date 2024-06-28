import { v2 as cloudinary } from 'cloudinary';

import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } from '@/config/constants';

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

export const upload = async (file: string, folder: string, public_id?: string, overwrite?: boolean, invalidate?: boolean) => {
  try {
    const response = await cloudinary.uploader.upload(file, {
      public_id,
      folder,
      overwrite,
      invalidate
    });
    return response;
  } catch (error) {
    return error;
  }
};
