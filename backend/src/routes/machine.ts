import { Request, Response, Router } from "express";
import { getMachineHealth } from "../functions";
import {
  getCompleteMachineHistory,
  getMachineValues,
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

    storeMachineHistory(userId, req.body, result);

    res.json(result);
  }
});

machineRouter.get("/health", async (req: Request, res: Response) => {
  const userId = req.user?.user_id || "";

  const history = await getCompleteMachineHistory(userId);

  res.json(history);
});

machineRouter.get("/values", async (req: Request, res: Response) => {
  const userId = req.user?.user_id || "";

  const machineValues = await getMachineValues(userId);

  res.json(machineValues);
});

export { machineRouter };
