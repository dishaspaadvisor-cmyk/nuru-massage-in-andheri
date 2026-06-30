import mongoose, { Schema } from "mongoose";

const TrafficEventSchema = new Schema(
  {
    eventType: { type: String, required: true, index: true },
    path: { type: String, index: true },
    href: String,
    label: String
  },
  { timestamps: true }
);

export const TrafficEvent =
  mongoose.models.TrafficEvent || mongoose.model("TrafficEvent", TrafficEventSchema);
