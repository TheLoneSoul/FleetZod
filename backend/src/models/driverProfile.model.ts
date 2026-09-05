import { Schema, Types, model } from "mongoose";

export enum VehicleType {
  BIKE = "BIKE",
  CAR = "CAR",
  TRUCK = "TRUCK",
}

export enum VerificationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface IDriverProfile {
  userId: Types.ObjectId;
  licenseNumber: string;
  vehicleType: VehicleType;
  plateNumber: string;
  verificationStatus: VerificationStatus;
  isOnline: boolean;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const driverProfileSchema = new Schema<IDriverProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      uppercase: true,
      unique: true,
      trim: true,
    },
    vehicleType: {
      type: String,
      enum: Object.values(VehicleType),
      required: [true, "Vehicle type is required"],
    },
    plateNumber: {
      type: String,
      required: [true, "Plate Number is required"],
      uppercase: true,
      trim: true,
      unique: true,
    },
    verificationStatus: {
      type: String,
      enum: Object.values(VerificationStatus),
      default: VerificationStatus.PENDING,
      index: true,
    },
    isOnline: { type: Boolean, default: false, index: true },
    isAvailable: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export const driverProfileModel = model<IDriverProfile>(
  "DriverProfile",
  driverProfileSchema,
);
