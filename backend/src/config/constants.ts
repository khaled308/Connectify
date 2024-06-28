import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL as string;
export const REDIS_URL = process.env.REDIS_URL as string;
export const CLIENT_URL = process.env.CLIENT_URL as string;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET as string;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string;
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
