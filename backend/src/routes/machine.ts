import { Request, Response, Router } from "express";
import { getMachineHealth } from "../functions";
import {
  getCompleteMachineHistory,
  getMachineHealthValues,
  getMachineValues,
  storeMachineHealthStateValues,
  storeMachineHistory,
  storeMachineStateValues,
} from "../handlers";
import { authenticateToken } from "../middlewares";

const machineRouter = Router();

machineRouter.use(authenticateToken);

// Endpoint to get machine health score
machineRouter.post("/health", (req: Request, res: Response) => {
  const userId = req.user?.user_id || "";

  const result = getMachineHealth(req);

  if (result.error) {
    res.status(400).json(result);
  } else {
    storeMachineStateValues(userId, req.body);

    storeMachineHealthStateValues(userId, result);

    storeMachineHistory(userId, req.body, result);

    res.json(result);
  }
});

machineRouter.get("/health", async (req: Request, res: Response) => {
  const userId = req.user?.user_id || "";

  const history = await getCompleteMachineHistory(userId);

  res.json(history);
});

machineRouter.post("/values", async (req: Request, res: Response) => {
  const userId = req.user?.user_id || "";

  storeMachineStateValues(userId, req.body);

  return res.sendStatus(201);
});

machineRouter.get("/values", async (req: Request, res: Response) => {
  const userId = req.user?.user_id || "";

  const machineValues = await getMachineValues(userId);

  res.json(machineValues);
});

machineRouter.get("/health-values", async (req: Request, res: Response) => {
  const userId = req.user?.user_id || "";

  const machineValues = await getMachineHealthValues(userId);

  res.json(machineValues);
});

export { machineRouter };
