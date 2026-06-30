import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

let cached = globalThis as typeof globalThis & {
  mongooseConnection?: Promise<typeof mongoose>;
};

export async function connectMongoose() {
  if (!uri) {
    return null;
  }

  if (!cached.mongooseConnection) {
    cached.mongooseConnection = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB || "spa_seo_analytics"
    });
  }

  return cached.mongooseConnection;
}
