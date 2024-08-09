import * as z from "zod";
import { d3apiLocatorSchema, rpcStatusSchema } from "../commonSchema.js";
const quickcalLineUpCurrentPoseRequestSchema = z.object({
  projector: d3apiLocatorSchema,
  referencePoint: d3apiLocatorSchema,
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
});

const quickcalListReferencePointsResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.array(
    z.object({
      uid: z.string(),
      name: z.string(),
    })
  ),
});

const quickcalResetLineUpRequestSchema = z.object({
  projector: d3apiLocatorSchema,
});
