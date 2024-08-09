import * as z from "zod";
import { rpcStatusSchema, statusD3VersionInfoSchema } from "../commonSchema.js";
export const statusGetProjectResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.object({
    projectPath: z.string(),
    version: statusD3VersionInfoSchema,
  }),
});

const machineModel = z.enum([
  "Unknown",
  "Designer",
  "V2_5",
  "Pro4x2",
  "Pro4x4",
  "Plus2x2",
  "Pro4x4NoVfcs",
  "Node",
  "Pro2x4",
  "Gx1",
  "Gx2",
  "SoloV1",
  "Vx4",
  "Gx2c",
  "Rx",
  "RxII",
  "Vx1",
  "Vx2",
  "Vx4Plus",
  "Gx3",
  "Vx4n",
  "EX3",
  "Vx2Plus",
  "CustomRenderNode",
  "Vx3",
]);
export const machine = z.object({
  uid: z.string(),
  name: z.string(),
  hostname: z.string(),
});

export const machineWithModel = z.object({
  ...machine.shape,
  type: machineModel,
});

export const statusGetSessionResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.object({
    isRunningSolo: z.boolean(),
    isDirectorDedicated: z.boolean(),
    director: machineWithModel.optional(),
    actors: z.array(machineWithModel),
    understudies: z.array(machineWithModel),
  }),
});
export const statusListHealthResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.array(
    z.object({
      machine: machine,
      runningAsMachine: machine,
      status: z.object({
        averageFPS: z.number(),
        videoDroppedFrames: z.number(),
        videoMissedFrames: z.number(),
        states: z.array(
          z.object({
            name: z.string(),
            detail: z.string(),
            category: z.string(),
            severity: z.string(),
          })
        ),
      }),
    })
  ),
});
export const statusListNotificationsResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.array(
    z.object({
      machine: machine,
      notifications: z.array(
        z.object({
          summary: z.string(),
          detail: z.string(),
        })
      ),
    })
  ),
});
