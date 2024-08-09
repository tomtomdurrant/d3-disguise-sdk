import * as z from "zod";
import {
  d3apiLocatorSchema,
  d3apiVec3FloatSchema,
  rpcStatusSchema,
} from "../commonSchema.js";

const colourCDLInfoSchema = z.object({
  uid: z.string(),
  name: z.string(),
  slope: d3apiVec3FloatSchema,
  offset: d3apiVec3FloatSchema,
  power: d3apiVec3FloatSchema,
  saturation: z.number(),
});

const colourListCDLsResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.array(colourCDLInfoSchema),
});

const colourSetCDLRequestSchema = z.object({
  cdl: colourCDLInfoSchema,
});

const mixedrealityCameraInfoSchema = z.object({
  uid: z.string(),
  name: z.string(),
  spatialCalibration: z.object({
    uid: z.string(),
    name: z.string(),
  }),
});

const mixedrealityGetCamerasResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.array(mixedrealityCameraInfoSchema),
});

const mixedrealityCaptureObservationRequestSchema = z.object({
  camera: d3apiLocatorSchema,
  spatialCalibration: d3apiLocatorSchema.optional(),
});

const mixedrealityDeleteAllObservationsRequestSchema = z.object({
  spatialCalibration: d3apiLocatorSchema,
});

const mixedrealityDeleteObservationsRequestSchema = z.object({
  observations: z.array(z.string()),
});

const mixedrealityEnableObservationParamsSchema = z.object({
  uid: z.string(),
  enable: z.boolean(),
});

const mixedrealityEnableObservationsRequestSchema = z.object({
  observations: z.array(mixedrealityEnableObservationParamsSchema),
});

const mixedrealityGetMRSetsResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.array(
    z.object({
      uid: z.string(),
      name: z.string(),
      currentCamera: z.object({
        uid: z.string(),
        name: z.string(),
      }),
      isCameraOverride: z.boolean(),
    })
  ),
});

const mixedrealityListSpatialCalibrationsResponseSchema = z.object({
  status: rpcStatusSchema,
  result: z.array(
    z.object({
      uid: z.string(),
      name: z.string(),
      mrsets: z.array(
        z.object({
          uid: z.string(),
          name: z.string(),
        })
      ),
      observations: z.array(
        z.object({
          uid: z.string(),
          name: z.string(),
          trackedPose: z.object({
            position: d3apiVec3FloatSchema,
            rotation: d3apiVec3FloatSchema,
          }),
          solvedPose: z.object({
            position: d3apiVec3FloatSchema,
            rotation: d3apiVec3FloatSchema,
          }),
          isEnabled: z.boolean(),
          zoom: z.number(),
          focus: z.number(),
          type: z.enum(["Primary", "Secondary"]),
          rmsError: z.number(),
        })
      ),
    })
  ),
});

const mixedrealitySelectCameraRequestSchema = z.object({
  mrSet: d3apiLocatorSchema,
  cameraOverride: d3apiLocatorSchema.optional(),
});

const mixedrealitySelectSpatialCalibrationRequestSchema = z.object({
  camera: d3apiLocatorSchema,
  spatialCalibration: d3apiLocatorSchema,
});
