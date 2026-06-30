import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri && process.env.NODE_ENV === "production") {
  console.warn("MONGODB_URI is not configured. Traffic analytics will be skipped.");
}

let cachedClient: MongoClient | null = null;
let cachedPromise: Promise<MongoClient> | null = null;

export async function getMongoClient() {
  if (!uri) {
    return null;
  }

  if (cachedClient) {
    return cachedClient;
  }

  if (!cachedPromise) {
    cachedPromise = new MongoClient(uri).connect();
  }

  cachedClient = await cachedPromise;
  return cachedClient;
}
