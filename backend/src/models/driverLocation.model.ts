import { Schema, model, type Document, Types } from "mongoose";

export interface IDriverLocation extends Document {
  driverId: Types.ObjectId;
  location: { type: "Point"; coordinates: [number, number] };
  heading?: number;
  speed?: number;
  createdAt: Date;
  updatedAt: Date;
}

const driverLocationSchema = new Schema<IDriverLocation>(
  {
    driverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true },
    },
    heading: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
  },
  { timestamps: true },
);

driverLocationSchema.index({ location: "2dsphere" });

export const driverLocationModel = model<IDriverLocation>(
  "DriverLocation",
  driverLocationSchema,
);
