import mongoose, { Schema, models, model } from "mongoose"

// Contact form submissions. These are NEVER deleted by the app —
// the admin can only read them.
const MessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: "" },
    // "researcher" | "university" | "company"
    profileType: { type: String, default: "" },
    service: { type: String, default: "" },
    companySize: { type: String, default: "" },
    organization: { type: String, default: "" },
    subject: { type: String, default: "" },
    message: { type: String, required: true },
    consent: { type: Boolean, default: false },
    attachments: [
      {
        name: { type: String, default: "" },
        type: { type: String, default: "" },
        size: { type: Number, default: 0 },
        data: { type: String, default: "" },
      },
    ],
    handled: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default models.Message || model("Message", MessageSchema)
