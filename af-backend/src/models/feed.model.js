import mongoose from "mongoose";

const FeedSchema = new mongoose.Schema({
    message: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
  },
  { timestamps: true }
);

const Feed = mongoose.model("Feed", FeedSchema);
export default Feed