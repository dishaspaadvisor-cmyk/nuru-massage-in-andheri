import mongoose, { Schema } from "mongoose";

const LeadSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    service: String,
    preferredDate: String,
    message: String,
    sourcePath: String
  },
  { timestamps: true }
);

export const Lead = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
