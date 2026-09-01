import { Schema, model, type Document, Types } from "mongoose";
import { VehicleType } from "./driverProfile.model.js";

export enum Status {
  SEARCHING = "SEARCHING",
  ACCEPTED = "ACCEPTED",
  ARRIVED = "ARRIVED",
  IN_TRANSIT = "IN_TRANSIT",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface ITrip extends Document {
  riderId: Types.ObjectId;
  driverId?: Types.ObjectId;
  pickupLocation: {
    address: string;
    type: "Point";
    coordinates: [number, number];
  };
  dropoffLocation: {
    address: string;
    type: "Point";
    coordinates: [number, number];
  };
  status: Status;
  fare: number;
  vehicleType: VehicleType;
  createdAt: Date;
  updatedAt: Date;
}

const TripSchema = new Schema<ITrip>(
  {
    riderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Rider Id is required"],
    },
    driverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    pickupLocation: {
      address: { type: String, required: [true, "Address is required"] },
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: {
        type: [Number],
        required: [true, "Logitude and Latitude are required"],
      },
    },
    dropoffLocation: {
      address: { type: String, required: [true, "Address is required"] },
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: {
        type: [Number],
        required: [true, "Logitude and Latitude are required"],
      },
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.SEARCHING,
      required: [true, "Status is required"],
    },
    fare: {
      type: Number,
      required: [true, "Trip fare is required"],
      min: [0, "Fare cannot be negative"],
    },
    vehicleType: {
      type: String,
      enum: Object.values(VehicleType),
      required: [true, "Vehicle type is required"],
    },
  },
  { timestamps: true },
);

TripSchema.index({
  "pickupLocation.coordinates": "2dsphere",
});
export const TripSchemaModel = model<ITrip>("Trip", TripSchema);
