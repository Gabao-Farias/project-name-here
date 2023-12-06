import { compare, hash } from "bcrypt";
import { Request, Response, Router } from "express";
import { verify } from "jsonwebtoken";
import {
  RefreshToken,
  User,
  refreshTokenRepository,
  userRepository,
} from "../database";
import { authenticateToken } from "../middlewares";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/security/jwt";

const authRouter = Router();

authRouter.post("/signup", async (req: Request, res: Response) => {
  const requestedUserEmail = req.body.email;

  const userFound = await userRepository.findOne({
    where: {
      email: requestedUserEmail,
    },
  });

  if (userFound) {
    return res.status(409).send("Email invalid or unavailable");
  }

  try {
    const hashedPassword = await hash(req?.body.password, 10);

    const newUser = new User();
    newUser.email = req.body.email;
    newUser.password = hashedPassword;

    await userRepository.insert(newUser);

    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
});

authRouter.post("/signin", async (req: Request, res: Response) => {
  const requestedUserEmail = req.body.email || "";

  const userFound = await userRepository.findOne({
    where: {
      email: requestedUserEmail,
    },
  });

  if (!userFound) {
    return res.status(400).send("User name or password incorrect");
  }

  try {
    const passwordMatch = await compare(req.body.password, userFound.password);

    if (!passwordMatch) {
      return res.status(403).send("User name or password incorrect");
    }

    const reqUser: Partial<JWTDefaultDecryptedValues> = {
      user_id: userFound.user_id,
    };

    const accessToken = generateAccessToken(reqUser);
    const refreshToken = generateRefreshToken(reqUser);

    const newRefreshToken = new RefreshToken();
    newRefreshToken.refresh_token = refreshToken;
    newRefreshToken.user_id = userFound.user_id;

    await refreshTokenRepository.insert(newRefreshToken);

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).send();
  }
});

authRouter.post("/token", async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  const refreshTokenFound = await refreshTokenRepository.findOne({
    where: { refresh_token: refreshToken },
  });

  if (!refreshTokenFound) {
    return res.sendStatus(403);
  }

  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "";

  verify(refreshToken, refreshTokenSecret, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403);
    }

    if (!user) {
      return res.sendStatus(403);
    }

    const accessToken = generateAccessToken({ name: user.name });

    res.json({ accessToken });
  });
});

authRouter.delete(
  "/signout",
  authenticateToken,
  async (req: Request, res: Response) => {
    const requestedUserId = req.user?.user_id;

    const refreshTokenFound = await refreshTokenRepository.findOne({
      where: {
        user_id: requestedUserId,
      },
    });

    if (!refreshTokenFound) {
      return res.sendStatus(403);
    }

    await refreshTokenRepository.delete({
      user_id: requestedUserId,
    });

    return res.sendStatus(204);
  }
);

export { authRouter };
