import { z } from "zod";
import { VehicleType } from "../models/driverProfile.model.js";
import { Status } from "../models/trip.model.js";
export const createTripSchema = z.object({
  pickupLocation: z.object({
    address: z.string({ message: "Address is required" }).trim(),
    coordinates: z.tuple([
      z
        .number({ message: "Longitude is required" })
        .min(-180, "Longitude must be at least -180")
        .max(180, "Longitude cannot exceed 180"),
      z
        .number({ message: "Latitude is required" })
        .min(-90, "Latitude must be at least -90")
        .max(90, "Latitude cannot exceed 90"),
    ]),
  }),
  dropoffLocation: z.object({
    address: z.string({ message: "Address is required" }).trim(),
    coordinates: z.tuple([
      z
        .number({ message: "Longitude is required" })
        .min(-180, "Longitude must be at least -180")
        .max(180, "Longitude cannot exceed 180"),
      z
        .number({ message: "Latitude is required" })
        .min(-90, "Latitude must be at least -90")
        .max(90, "Latitude cannot exceed 90"),
    ]),
  }),
  vehicleType: z.enum(VehicleType, "Vehicle type is required"),
});

export type CreateTripSchemaInput = z.infer<typeof createTripSchema>;

export const updateTripStatusSchema = z.object({
  status: z.enum(Status),
});

export type UpdateTripStatusSchemaInput = z.infer<
  typeof updateTripStatusSchema
>;
