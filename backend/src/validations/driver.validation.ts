import { z } from "zod";
import { VehicleType } from "../models/driverProfile.model.js";

export const registerDriverSchema = z.object({
  VehicleType: z.enum(VehicleType, {
    message: "Vehicle type must be car, bike or truck",
  }),
  vehicleNumber: z
    .string({ message: "Vehicle number is required" })
    .trim()
    .toUpperCase()
    .min(3, "Vehicle number must be at least 3 characters")
    .max(20, "Vehicle number cannot exceed 20 characters"),
  licenseNumber: z
    .string({ message: "License Number is required" })
    .trim()
    .toUpperCase()
    .min(5, "License number must be at least 5 characters")
    .max(20, "License number cannot exceed 20 characters"),
});

export type RegisterDriverInput = z.infer<typeof registerDriverSchema>;

export const updateDriverLocationSchema = z.object({
  coordinates: z.tuple([
    z
      .number()
      .min(-180, "Longitude must be at least -180")
      .max(180, "Longitude cannot exceed 180"),

    z
      .number()
      .min(-90, "Latitude must be at least -90")
      .max(90, "Latitude cannot exceed 90"),
  ]),
  heading: z
    .number()
    .min(0, "Vehicle direction angle must be at least 0")
    .max(360, "Vehicle direction angle cannot exceed 360"),
});

export type UpdateDriverLocationInput = z.infer<
  typeof updateDriverLocationSchema
>;
