import mongoose from 'mongoose';
import { DATABASE_URL } from './constants';
import logger from './logger';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DATABASE_URL);
    logger('database').info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    const err = error as Error;
    logger('database').error(`Error: ${err.message}`);
    process.exit(1);
  }
};
