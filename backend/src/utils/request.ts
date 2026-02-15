import { ApiError } from "./http";

export function requiredParam(value: string | string[] | undefined, name: string): string {
  const normalized = Array.isArray(value) ? value[0] : value;
  if (!normalized) {
    throw new ApiError(400, `Missing required parameter: ${name}`);
  }
  return normalized;
}

export function optionalString(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  }
  return undefined;
}
