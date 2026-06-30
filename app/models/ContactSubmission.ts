import mongoose, { Schema } from "mongoose";

const ContactSubmissionSchema = new Schema(
  {
    name: String,
    phone: String,
    service: String,
    preferredDate: String,
    message: String,
    sourcePath: String
  },
  { timestamps: true }
);

export const ContactSubmission =
  mongoose.models.ContactSubmission ||
  mongoose.model("ContactSubmission", ContactSubmissionSchema);
