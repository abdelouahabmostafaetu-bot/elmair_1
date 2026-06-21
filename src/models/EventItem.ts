import mongoose, { Schema, models, model } from "mongoose"

const EventItemSchema = new Schema(
  {
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, default: "", trim: true },
    descriptionAr: { type: String, default: "" },
    descriptionEn: { type: String, default: "" },
    locationAr: { type: String, default: "" },
    locationEn: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    registrationUrl: { type: String, default: "" },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default models.EventItem || model("EventItem", EventItemSchema)
