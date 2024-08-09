import * as z from "zod";
import { rpcStatusSchema, systemD3VersionInfoSchema } from "../commonSchema.js";

export const systemProjectInfoSchema = z.object({
  path: z.string(),
  lastModified: z.string(),
  version: systemD3VersionInfoSchema,
});

export const systemProjectsInSystemInfoSchema = z.object({
  hostname: z.string(),
  lastProject: z.string(),
  projects: z.array(systemProjectInfoSchema),
});
export const systemListProjectsResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.array(systemProjectsInSystemInfoSchema),
});

export type ListProjectsResponse = z.infer<
  typeof systemListProjectsResponseSchema
>;

export const detectSystemsResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.array(
    z.object({
      hostname: z.string(),
      type: z.string(),
      version: z.object({
        major: z.number(),
        minor: z.number(),
        hotfix: z.number(),
        revision: z.number(),
      }),
      runningProject: z.string(),
      ipAddress: z.string(),
      isDesignerRunning: z.boolean(),
      isServiceRunning: z.boolean(),
      isManagerRunning: z.boolean(),
      isNotchHostRunning: z.boolean(),
    })
  ),
});
export type SystemsResponse = z.infer<typeof detectSystemsResponseSchema>;
