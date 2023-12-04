import { compare, hash } from "bcrypt";
import "dotenv/config";
import { Request, Response, Router } from "express";
import { sign } from "jsonwebtoken";
import { users } from "../database";
import { DEFAULT_ACCESS_TOKEN_EXPIRES_IN } from "../utils";

const authRouter = Router();

authRouter.post("/signup", async (req: Request, res: Response) => {
  const userName = req.body.name;

  const user = users.find((user) => user.name === userName);

  if (user) {
    return res.status(409).send("Name already taken");
  }

  try {
    const hashedPassword = await hash(req?.body.password, 10);

    const user = {
      name: req.body.name,
      password: hashedPassword,
    };

    users.push(user);

    console.log(users);

    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
});

authRouter.post("/signin", async (req: Request, res: Response) => {
  const userName = req.body.name;

  const user = users.find((user) => user.name === userName);

  if (user === undefined) {
    return res.status(400).send("User not found");
  }

  try {
    const passwordMatch = await compare(req.body.password, user.password);

    if (!passwordMatch) {
      return res.status(403).send("User name or password incorrect");
    }

    const reqUser = { name: userName };
    const jwtSecret = process.env.ACCESS_TOKEN_SECRET || "";

    const accessToken = sign(reqUser, jwtSecret, {
      expiresIn: DEFAULT_ACCESS_TOKEN_EXPIRES_IN,
    });

    return res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).send();
  }
});

export { authRouter };
