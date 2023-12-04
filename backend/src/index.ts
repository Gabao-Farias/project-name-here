import { compare, hash } from "bcrypt";
import "dotenv/config";
import express, { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { getMachineHealth } from "./functions";
import { authenticateToken } from "./middlewares";

const app = express();
const port = 3001;

const users: any[] = [];

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to get machine health score
app.post(
  "/machine-health",
  authenticateToken,
  (req: Request, res: Response) => {
    const result = getMachineHealth(req);
    if (result.error) {
      res.status(400).json(result);
    } else {
      res.json(result);
    }
  }
);

app.post("/users", (req: Request, res: Response) => {
  res.status(200).json(users);
});

app.post("/auth/signup", async (req: Request, res: Response) => {
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

app.post("/auth/signin", async (req: Request, res: Response) => {
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

    const accessToken = sign(reqUser, jwtSecret);

    return res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`API is listening at http://localhost:${port}`);
});
