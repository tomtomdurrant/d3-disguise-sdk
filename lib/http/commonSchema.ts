import { z } from "zod";

const rpcStatusSchema = z.object({
  code: z.number(),
  message: z.string(),
  details: z.array(
    z.object({ "@type": z.string(), uid: z.string(), message: z.string() })
  ),
});

const d3apiVec3FloatSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});

const d3apiLocatorSchema = z.object({
  uid: z.string(),
  name: z.string(),
});

const d3apiEmptyResponseSchema = z.object({
  status: rpcStatusSchema,
});

const d3apiBoolResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.boolean(),
});

const statusD3VersionInfoSchema = z.object({
  major: z.number(),
  minor: z.number(),
  hotfix: z.number(),
  revision: z.number(),
});

export const systemD3VersionInfoSchema = z.object({
  major: z.number().int(),
  minor: z.number().int(),
  hotfix: z.number().int(),
  revision: z.number().int(),
});

export {
  rpcStatusSchema,
  d3apiVec3FloatSchema,
  d3apiLocatorSchema,
  d3apiEmptyResponseSchema,
  d3apiBoolResponseSchema,
  statusD3VersionInfoSchema,
};
