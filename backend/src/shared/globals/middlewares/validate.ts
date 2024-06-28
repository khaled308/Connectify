import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import HTTP_STATUS_CODE from 'http-status-codes';

const validateSchema = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ errors: error.errors });
      }
      console.log(error);
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  };
};

export default validateSchema;
