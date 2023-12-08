import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = (authHeader && authHeader?.split(" ")[1]) || "";

  if (token === undefined) {
    return res.sendStatus(401);
  }

  const jwtSecret = process.env.ACCESS_TOKEN_SECRET || "";

  verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }

    req.user = user as JWTDefaultDecryptedValues;

    next();
  });
};
