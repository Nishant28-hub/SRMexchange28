import Listing, { CATEGORY_LIST } from "../models/Listing.js";

export const createListing = async (req, res, next) => {
  try {
    const { title, description, category, type, price, condition, images, location, tags } = req.body;

    if (!title || !description || !category || !type) {
      return res.status(400).json({ success: false, message: "Title, description, category and type are required" });
    }

    const listing = await Listing.create({
      title,
      description,
      category,
      type,
      price,
      condition,
      images,
      location,
      tags,
      owner: req.user._id,
    });

    return res.status(201).json({ success: true, listing });
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const { search, category, type, minPrice, maxPrice, status, page = 1, limit = 12 } = req.query;

    const query = {};

    if (search) query.$text = { $search: search };
    if (category) query.category = category;
    if (type) query.type = type;
    if (status) query.status = status;
    else query.status = "active";

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [listings, total] = await Promise.all([
      Listing.find(query)
        .populate("owner", "name avatar reputation college")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Listing.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      listings,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate("owner", "name avatar reputation college bio");

    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    return res.status(200).json({ success: true, listing });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    if (listing.owner.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized to edit this listing" });
    }

    const allowedUpdates = ["title", "description", "category", "type", "price", "condition", "images", "location", "status", "tags"];
    allowedUpdates.forEach((key) => {
      if (req.body[key] !== undefined) listing[key] = req.body[key];
    });

    await listing.save();

    return res.status(200).json({ success: true, listing });
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    if (listing.owner.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized to delete this listing" });
    }

    await listing.deleteOne();

    return res.status(200).json({ success: true, message: "Listing deleted" });
  } catch (error) {
    next(error);
  }
};

export const getMyListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ owner: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, listings });
  } catch (error) {
    next(error);
  }
};

export const toggleBookmark = async (req, res, next) => {
  try {
    const user = req.user;
    const listingId = req.params.id;

    const index = user.bookmarks.findIndex((id) => id.toString() === listingId);

    if (index > -1) {
      user.bookmarks.splice(index, 1);
    } else {
      user.bookmarks.push(listingId);
    }

    await user.save();

    return res.status(200).json({ success: true, bookmarks: user.bookmarks });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res) => {
  return res.status(200).json({ success: true, categories: CATEGORY_LIST });
};
