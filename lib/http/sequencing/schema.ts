import * as z from "zod";
import { d3apiLocatorSchema, rpcStatusSchema } from "../commonSchema.js";

const sequencingChangeIndirectionsRequestSchema = z.object({
  changes: z.array(
    z.object({
      indirection: d3apiLocatorSchema,
      resource: d3apiLocatorSchema,
    })
  ),
});

const sequencingListAvailableResourcesResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.array(
    z.object({
      uid: z.string(),
      name: z.string(),
    })
  ),
});

const sequencingListIndirectionsResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.array(
    z.object({
      uid: z.string(),
      name: z.string(),
      resourceType: z.string(),
      currentResource: z.object({
        uid: z.string(),
        name: z.string(),
      }),
    })
  ),
});
