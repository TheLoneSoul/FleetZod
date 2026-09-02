import { type Request, type Response, type NextFunction } from "express";
import { type AnyZodObject } from "zod/v3";

export interface IRequests {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
}

export const validateRequest =
  (schema: IRequests) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body ?? {});
      }
      if (schema.params) {
        req.params = await schema.params.parseAsync(req.params ?? {});
      }
      if (schema.query) {
        req.query = await schema.query.parseAsync(req.query ?? {});
      }
      next();
    } catch (error) {
      next(error);
    }
  };
