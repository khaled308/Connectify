import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL as string;
export const REDIS_URL = process.env.REDIS_URL as string;
export const CLIENT_URL = process.env.CLIENT_URL as string;
