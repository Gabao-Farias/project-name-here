import { hash } from "bcrypt";
import "dotenv/config";
import express, { Request, Response } from "express";
import { getMachineHealth } from "./machineHealth";

const app = express();
const port = 3001;

const users: any[] = [];

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to get machine health score
app.post("/machine-health", (req: Request, res: Response) => {
  const result = getMachineHealth(req);
  if (result.error) {
    res.status(400).json(result);
  } else {
    res.json(result);
  }
});

app.post("/users", (req: Request, res: Response) => {
  res.status(200).json(users);
});

app.post("/auth/signup", async (req: Request, res: Response) => {
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

app.listen(port, () => {
  console.log(`API is listening at http://localhost:${port}`);
});
