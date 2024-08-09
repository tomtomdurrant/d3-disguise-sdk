// systemsClient.ts

import { fetchJson, servicePath } from "../client.js";
import {
  detectSystemsResponseSchema,
  systemListProjectsResponseSchema,
} from "./schema.js";

export class SystemsClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getAll() {
    return fetchJson(
      `${this.baseUrl}/${servicePath}/system/detectsystems`,
      detectSystemsResponseSchema
    );
  }

  async listProjects() {
    return fetchJson(
      `${this.baseUrl}/${servicePath}/system/projects`,
      systemListProjectsResponseSchema
    );
  }
}
