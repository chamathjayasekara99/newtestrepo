import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema(
  {
    reviewID: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      maxlength: 2000,
      required: true,
    },
    images: {
      type: [String],
    },
    flagged: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", ReviewSchema);
