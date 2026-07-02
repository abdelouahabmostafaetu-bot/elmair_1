import mongoose from "mongoose"

// Cache the connection across hot reloads / serverless invocations.
interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache | undefined
}

const cached: MongooseCache = global._mongoose || { conn: null, promise: null }
global._mongoose = cached

export default async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn

  const MONGODB_URI = process.env.MONGODB_URI
  const MONGODB_DB = process.env.MONGODB_DB || "almeiyar"

  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in environment variables (.env)")
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB,
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}
