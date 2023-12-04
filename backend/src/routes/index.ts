import { Router } from "express";
import { authRouter } from "./auth";
import { machineRouter } from "./machine";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/machine", machineRouter);

export { rootRouter };
