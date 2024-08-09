import { fetchJson, postJson, sessionPath } from "../client.js";
import * as z from "zod";
import {
  goToNoteRequestSchema,
  goToTagRequestSchema,
  playmodeEnum,
  tagTypeEnum,
  transportGetActiveResponseSchema,
  transportGoToFrameRequestSchema,
  transportListTracksResponseSchema,
  transportPlayRequestSchema,
  transportSetBrightnessRequestSchema,
  transportSetEngagedRequestSchema,
  transportStopRequestSchema,
} from "./schema.js";
import { d3apiEmptyResponseSchema } from "../commonSchema.js";

export class ShowControlClient {
  constructor(private baseUrl: string) {}

  public async engage({ name, uid }: { name: string; uid: string }) {
    return this.setEngaged({
      transports: [
        {
          engaged: true,
          transport: {
            name: name,
            uid: uid,
          },
        },
      ],
    });
  }

  public async disengage({ name, uid }: { name: string; uid: string }) {
    return this.setEngaged({
      transports: [
        {
          engaged: false,
          transport: {
            name,
            uid,
          },
        },
      ],
    });
  }

  async play({ name, uid }: { name: string; uid: string }) {
    const request: z.infer<typeof transportPlayRequestSchema> = {
      transports: [
        {
          name,
          uid,
        },
      ],
    };
    return postJson(
      `${this.baseUrl}/${sessionPath}/transport/play`,
      d3apiEmptyResponseSchema,
      request
    );
  }
  async stop({ name, uid }: { name: string; uid: string }) {
    const request: z.infer<typeof transportStopRequestSchema> = {
      transports: [
        {
          name,
          uid,
        },
      ],
    };
    return postJson(
      `${this.baseUrl}/${sessionPath}/transport/stop`,
      d3apiEmptyResponseSchema,
      request
    );
  }
  async getActiveTransports() {
    return fetchJson(
      `${this.baseUrl}/${sessionPath}/transport/activetransport`,
      transportGetActiveResponseSchema
    );
  }

  async setBrightness({
    brightness,
    name,
    uid,
  }: {
    brightness: number;
    name: string;
    uid: string;
  }) {
    const request: z.infer<typeof transportSetBrightnessRequestSchema> = {
      transports: [
        {
          transport: {
            name,
            uid,
          },
          brightness,
        },
      ],
    };
    return postJson(
      `${this.baseUrl}/${sessionPath}/transport/brightness`,
      d3apiEmptyResponseSchema,
      request
    );
  }
  async listTracks() {
    return fetchJson(
      `${this.baseUrl}/${sessionPath}/transport/tracks`,
      transportListTracksResponseSchema
    );
  }
  async listAnnotations({
    trackName,
    trackUid,
  }: {
    trackName: string;
    trackUid: string;
  }) {
    const url = new URL(`${this.baseUrl}/${sessionPath}/transport/annotations`);
    url.searchParams.append("uid", trackUid);
    url.searchParams.append("name", trackName);
    return fetchJson(url.toString(), transportListTracksResponseSchema);
  }
  async goToNote({
    noteText,
    transportUid,
    transportName,
    playMode,
  }: {
    noteText: string;
    transportUid: string;
    transportName: string;
    playMode?: string;
  }) {
    const request: z.infer<typeof goToNoteRequestSchema> = {
      transports: [
        {
          note: noteText,
          transport: { uid: transportUid, name: transportName },
          playmode: playMode ?? "NotSet",
        },
      ],
    };
    return postJson(
      `${this.baseUrl}/${sessionPath}/transport/gotonote`,
      d3apiEmptyResponseSchema,
      request
    );
  }

  async goToTag({
    transportUid,
    transportName,
    tagValue,
    tagType,
    playMode,
  }: {
    transportUid: string;
    transportName: string;
    tagValue: string;
    tagType: z.infer<typeof tagTypeEnum>;
    playMode?: z.infer<typeof playmodeEnum>;
  }) {
    const request: z.infer<typeof goToTagRequestSchema> = {
      transports: [
        {
          transport: {
            uid: transportUid,
            name: transportName,
          },
          allowGlobalJump: true,
          playmode: playMode ?? "NotSet",
          type: tagType,
          value: tagValue,
        },
      ],
    };
    return postJson(
      `${this.baseUrl}/${sessionPath}/transport/gototag`,
      d3apiEmptyResponseSchema,
      request
    );
  }

  async goToFrame({
    frame,
    playMode,
    name,
    uid,
  }: {
    frame: number;
    playMode: z.infer<typeof playmodeEnum>;
    name: string;
    uid: string;
  }) {
    const request: z.infer<typeof transportGoToFrameRequestSchema> = {
      transports: [
        {
          transport: {
            name,
            uid,
          },
          frame,
          playmode: playMode,
        },
      ],
    };
    return postJson(
      `${this.baseUrl}/${sessionPath}/transport/gotoframe`,
      d3apiEmptyResponseSchema,
      request
    );
  }

  private async setEngaged(
    request: z.infer<typeof transportSetEngagedRequestSchema>
  ) {
    return postJson(
      `${this.baseUrl}/${sessionPath}/transport/engaged`,
      d3apiEmptyResponseSchema,
      request
    );
  }
}
