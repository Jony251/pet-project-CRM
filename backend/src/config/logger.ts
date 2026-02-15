type Meta = Record<string, unknown>;

function format(level: "INFO" | "WARN" | "ERROR", message: string, meta?: Meta) {
  return JSON.stringify({
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(meta ? { meta } : {}),
  });
}

export const logger = {
  info(message: string, meta?: Meta) {
    console.log(format("INFO", message, meta));
  },
  warn(message: string, meta?: Meta) {
    console.warn(format("WARN", message, meta));
  },
  error(message: string, meta?: Meta) {
    console.error(format("ERROR", message, meta));
  },
};
