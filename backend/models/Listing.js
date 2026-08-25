import mongoose from "mongoose";

const CATEGORIES = [
  "Books",
  "Notes",
  "Electronics",
  "Accessories",
  "Furniture",
  "Tickets",
  "Giveaways",
  "Lost & Found",
  "Services",
  "Skills",
  "Others",
];

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, maxlength: 2000 },
    category: { type: String, required: true, enum: CATEGORIES },
    type: {
      type: String,
      required: true,
      enum: ["sell", "exchange", "donate", "skill", "request"],
    },
    price: { type: Number, default: 0, min: 0 },
    condition: {
      type: String,
      enum: ["new", "like-new", "good", "fair", "used"],
      default: "good",
    },
    images: [{ type: String }],
    location: { type: String, trim: true },
    status: {
      type: String,
      enum: ["active", "pending", "completed", "cancelled"],
      default: "active",
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

listingSchema.index({ title: "text", description: "text", tags: "text" });

export const CATEGORY_LIST = CATEGORIES;
export default mongoose.model("Listing", listingSchema);
