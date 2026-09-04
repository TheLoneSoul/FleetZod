import { type Request, type Response, type NextFunction } from "express";
import { type ZodType } from "zod";

export interface IRequests {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}

export const validateRequest =
  (schema: IRequests) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body ?? {});
      }
      if (schema.params) {
        req.params = (await schema.params.parseAsync(
          req.params ?? {},
        )) as Record<string, string>;
      }
      if (schema.query) {
        req.query = (await schema.query.parseAsync(req.query ?? {})) as Record<
          string,
          unknown
        > as any;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
