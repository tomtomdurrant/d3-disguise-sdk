import * as z from "zod";
import { d3apiLocatorSchema, rpcStatusSchema } from "../commonSchema.js";

export const transportSetEngagedRequestSchema = z.object({
  transports: z.array(
    z.object({
      transport: d3apiLocatorSchema,
      engaged: z.boolean(),
    })
  ),
});

export const playmodeEnum = z.enum([
  "NotSet",
  "Play",
  "PlaySection",
  "Loop",
  "Stop",
  "Unknown",
]);

export const transportPlayRequestSchema = z.object({
  transports: z.array(d3apiLocatorSchema),
});
export const transportStopRequestSchema = z.object({
  transports: z.array(d3apiLocatorSchema),
});
export const transportGetActiveResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.array(
    z.object({
      uid: z.string(),
      name: z.string(),
      engaged: z.boolean(),
      volume: z.number(),
      brightness: z.number(),
      playmode: playmodeEnum,
      currentTrack: z.object({
        uid: z.string(),
        name: z.string(),
      }),
    })
  ),
});

export type ActiveTransport = z.infer<typeof transportGetActiveResponseSchema>;
export const transportSetBrightnessRequestSchema = z.object({
  transports: z.array(
    z.object({
      transport: d3apiLocatorSchema,
      brightness: z.number(),
    })
  ),
});
export const transportGoToFrameRequestSchema = z.object({
  transports: z.array(
    z.object({
      transport: d3apiLocatorSchema,
      frame: z.number(),
      playmode: playmodeEnum.optional(),
    })
  ),
});

export const transportListTracksResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.array(
    z
      .object({
        uid: z.string(),
        name: z.string(),
        length: z.number(),
        crossfade: z.enum(["Unknown", "Off", "Fade", "TrackSection"]),
      })
      .passthrough()
  ),
});
export const tagTypeEnum = z.enum(["TagType_Unknown", "TC", "MIDI", "CUE"]);
export const transportListAnnotationsResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.object({
    uid: z.string(),
    name: z.string(),
    annotations: z.object({
      notes: z.array(
        z.object({
          time: z.number(),
          text: z.string(),
        })
      ),
      tags: z.array(
        z.object({
          time: z.number(),
          type: tagTypeEnum,
          value: z.string(),
        })
      ),
      sections: z.array(
        z.object({
          time: z.number(),
          index: z.string(),
        })
      ),
    }),
  }),
});

export const goToNoteRequestSchema = z.object({
  transports: z.array(
    z.object({
      transport: d3apiLocatorSchema,
      note: z.string(),
      playmode: z.string(),
    })
  ),
});

export const goToTagRequestSchema = z.object({
  transports: z.array(
    z.object({
      transport: d3apiLocatorSchema,
      type: tagTypeEnum,
      value: z.string(),
      allowGlobalJump: z.boolean(),
      playmode: z.string(),
    })
  ),
});
