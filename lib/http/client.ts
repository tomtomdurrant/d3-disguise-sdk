// apiClient.ts

import { ZodSchema } from "zod";

export const sessionPath = "api/session";
export const statusPath = "api/status";
export const servicePath = "api/service";

export async function fetchJson<Response>(
  url: string,
  schema: ZodSchema<Response>
): Promise<Response> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return schema.parse(data);
}

export async function postJson<Response, Request>(
  url: string,
  schema: ZodSchema<Response>,
  json: Request
): Promise<Response> {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(json),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return schema.parse(data);
}
