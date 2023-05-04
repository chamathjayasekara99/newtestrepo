import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
  {
    location: {
      type: String,
    },
    approvalStatus: {
      type: String,
      default: "pending",
    },
    contactInfo: [
      {
        type: String,
      },
    ],
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      default: [],
    },

    category: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
      default: [],
    },
    farmerReviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Review",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Farmer = mongoose.model("Farmer", farmerSchema);

export default Farmer;
