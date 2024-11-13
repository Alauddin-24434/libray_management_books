import express, { Application, Request, Response } from "express";
import cors from "cors";
import { notFound } from "./app/middleware/notFound";

import { allRoutes } from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    mesage: "Libray is connected successfully!",
    status: 200,
  });
});

// all routes
app.use("/api", allRoutes);

app.use(globalErrorHandler);

// not found  middleware
app.use(notFound);

export default app;
