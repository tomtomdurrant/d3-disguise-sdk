import * as z from "zod";
import { d3apiLocatorSchema, rpcStatusSchema } from "../commonSchema.js";
const renderstreamGetAssignersResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.array(
    z.object({
      uid: z.string(),
      name: z.string(),
      transport: z.object({
        type: z.string(),
        format: z.string(),
        bitDepth: z.number(),
      }),
      alpha: z.boolean(),
      overlapPixels: z.number(),
      paddingPixels: z.number(),
      preferredNetwork: z.object({
        ip: z.string(),
        name: z.string(),
      }),
    })
  ),
});

const renderstreamFailoverRequestSchema = z.object({
  machine: d3apiLocatorSchema,
});

const renderstreamGetLayerConfigResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.object({
    framerateFractionDivisor: z.number(),
    asset: z.object({
      uid: z.string(),
      name: z.string(),
    }),
    pool: z.object({
      uid: z.string(),
      name: z.string(),
    }),
    channelMappings: z.array(
      z.object({
        channel: z.string(),
        mapping: z.object({
          uid: z.string(),
          name: z.string(),
        }),
        assigner: z.object({
          uid: z.string(),
          name: z.string(),
        }),
      })
    ),
    defaultAssigner: z.object({
      uid: z.string(),
      name: z.string(),
    }),
  }),
});

const renderstreamGetLayerStatusResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.object({
    reference: z.object({
      tNow: z.number(),
    }),
    workload: z.object({
      uid: z.string(),
      name: z.string(),
      instances: z.array(
        z.object({
          machineUid: z.string(),
          machineName: z.string(),
          state: z.string(),
          healthMessage: z.string(),
          healthDetails: z.string(),
        })
      ),
    }),
    streams: z.array(
      z.object({
        uid: z.string(),
        name: z.string(),
        sourceMachine: z.string(),
        receiverMachine: z.string(),
        status: z.object({
          subscriptionWanted: z.boolean(),
          subscribeSuccessful: z.boolean(),
          tLastDropped: z.number(),
          tLastError: z.number(),
          lastErrorMessage: z.string(),
        }),
        statusString: z.string(),
      })
    ),
    assetErrors: z.array(z.string()),
  }),
});

const renderstreamGetLayersResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.array(
    z.object({
      uid: z.string(),
      name: z.string(),
    })
  ),
});

const renderstreamGetPoolsResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.array(
    z.object({
      uid: z.string(),
      name: z.string(),
      machines: z.array(
        z.object({
          uid: z.string(),
          name: z.string(),
          preferredSyncAdapter: z.string(),
          adapters: z.array(
            z.object({
              name: z.string(),
              ipAddress: z.string(),
              subnet: z.string(),
            })
          ),
        })
      ),
      understudies: z.array(
        z.object({
          uid: z.string(),
          name: z.string(),
          preferredSyncAdapter: z.string(),
          adapters: z.array(
            z.object({
              name: z.string(),
              ipAddress: z.string(),
              subnet: z.string(),
            })
          ),
        })
      ),
    })
  ),
});

const renderstreamRestartLayersRequestSchema = z.object({
  layers: z.array(d3apiLocatorSchema),
});

const renderstreamStartLayersRequestSchema = z.object({
  layers: z.array(d3apiLocatorSchema),
});

const renderstreamStopLayersRequestSchema = z.object({
  layers: z.array(d3apiLocatorSchema),
});

const renderstreamSyncLayersRequestSchema = z.object({
  layers: z.array(d3apiLocatorSchema),
});
