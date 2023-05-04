import { Schema, model } from "mongoose";

const commissionSchema = new Schema(
  {
    commission_percentage: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Commission", commissionSchema);
