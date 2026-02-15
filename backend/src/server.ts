import app from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { prisma } from "./utils/prisma";

const server = app.listen(env.PORT, () => {
  logger.info(`CRM API listening on port ${env.PORT}`);
});

async function shutdown(signal: string) {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});
