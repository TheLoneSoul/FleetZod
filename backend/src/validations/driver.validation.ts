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
    .max(30, "License number cannot exceed 20 characters"),
});

export type RegisterDriverInput = z.infer<typeof registerDriverSchema>;
