import "dotenv/config";
import "reflect-metadata";
import cors from "cors";
import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "@shared/container";
import uploadConfig from "@config/upload";
import { AppError } from "@shared/errors/AppError";
// import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

createConnection();

const app = express();

// app.use(rateLimiter);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

if (process.env.DISK === "local") {
  app.use("/avatar", express.static(`/${uploadConfig.tmpFolder}/avatar`));
  app.use("/cars", express.static(`/${uploadConfig.tmpFolder}/cars`));
}

app.use(cors());

app.use(router);

app.use(
  (
    err: Error,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
