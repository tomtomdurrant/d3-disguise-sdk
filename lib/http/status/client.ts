// systemsClient.ts

import { fetchJson, servicePath } from "../client.js";
import {
  statusGetProjectResponseSchema,
  statusGetSessionResponseSchema,
  statusListHealthResponseSchema,
  statusListNotificationsResponseSchema,
} from "./schema.js";

export class StatusClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  async getHealth() {
    return fetchJson(
      `${this.baseUrl}/${servicePath}/status/health`,
      statusListHealthResponseSchema
    );
  }

  async getNotifications() {
    return fetchJson(
      `${this.baseUrl}/${servicePath}/status/notifications`,
      statusListNotificationsResponseSchema
    );
  }
  async getCurrentProject() {
    return fetchJson(
      `${this.baseUrl}/${servicePath}/status/project`,
      statusGetProjectResponseSchema
    );
  }

  async getSessionInfo() {
    return fetchJson(
      `${this.baseUrl}/${servicePath}/status/session`,
      statusGetSessionResponseSchema
    );
  }
}
