import { sign } from "jsonwebtoken";
import { DEFAULT_ACCESS_TOKEN_EXPIRES_IN } from "../constants";

const jwtSecret = process.env.ACCESS_TOKEN_SECRET || "";
const refreshJWTSecret = process.env.REFRESH_TOKEN_SECRET || "";

export const generateAccessToken = (user: any) => {
  return sign(user, jwtSecret, { expiresIn: DEFAULT_ACCESS_TOKEN_EXPIRES_IN });
};

export const generateRefreshToken = (user: any) => {
  return sign(user, refreshJWTSecret);
};
