import { Request, Response, Router } from "express";
import { getMachineHealth } from "../functions";
import { storeMachineHistory } from "../handlers";
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
    storeMachineHistory(userId, req.body, result);

    res.json(result);
  }
});

export { machineRouter };
