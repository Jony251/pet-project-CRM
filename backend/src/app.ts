import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { openApiSpec } from "./docs/openapi";
import { errorHandler, notFound } from "./middlewares/error";
import { apiRateLimiter } from "./middlewares/rateLimiter";
import apiRoutes from "./routes";

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: env.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
    credentials: true,
  })
);
app.use(helmet());
app.use(apiRateLimiter);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  morgan("combined", {
    skip: () => env.NODE_ENV === "test",
    stream: {
      write(message) {
        logger.info(message.trim());
      },
    },
  })
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.use("/api/v1", apiRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
