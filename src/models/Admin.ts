import mongoose, { Schema, models, model } from "mongoose"

// Extra admins added by the owner. The SUPER_ADMIN_EMAIL from .env
// is always an admin even if it is not in this collection.
const AdminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, default: "" },
    addedBy: { type: String, default: "" },
  },
  { timestamps: true }
)

export default models.Admin || model("Admin", AdminSchema)
