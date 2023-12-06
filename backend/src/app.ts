import express from "express";
import { rootRouter } from "./routes";

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(rootRouter);

export { app };
