import { Schema, models, model } from "mongoose"

// A service offered by the center. Managed by admins from the dashboard and
// rendered on the public Services page (grouped by sector).
const ServiceSchema = new Schema(
  {
    sector: { type: String, enum: ["academic", "corporate"], default: "academic" },
    icon: { type: String, default: "Sparkles" }, // lucide icon name
    titleAr: { type: String, default: "" },
    titleEn: { type: String, default: "" },
    descAr: { type: String, default: "" },
    descEn: { type: String, default: "" },
    pointsAr: { type: [String], default: [] },
    pointsEn: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default models.Service || model("Service", ServiceSchema)
