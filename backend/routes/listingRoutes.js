import express from "express";
import {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
  getMyListings,
  toggleBookmark,
  getCategories,
} from "../controllers/listingController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/mine", protect, getMyListings);
router.get("/", getListings);
router.post("/", protect, createListing);
router.get("/:id", getListingById);
router.put("/:id", protect, updateListing);
router.delete("/:id", protect, deleteListing);
router.post("/:id/bookmark", protect, toggleBookmark);

export default router;
