import express from "express";
// import { protect, adminProtect } from "../middleware/auth";
import {
  getAllReviewsController,
  createProductReviewController,
  deleteProductReviewController,
  updateProductReviewController,
  createSellerReviewController,
  deleteSellerReviewController,
  updateSellerReviewController,
  getReviewByIdController,
  getReviewsController,
} from "../controllers/review.controller";

const userRouter = express.Router();

userRouter.get("/", getAllReviewsController);
userRouter.get("/read-reviews/", getReviewsController);
userRouter.get("/:review_id", getReviewByIdController);

userRouter.post("/products/create", createProductReviewController);
userRouter.post("/sellers/create", createSellerReviewController);

userRouter.delete("/products/delete/:review_id", deleteProductReviewController);
userRouter.delete("/sellers/delete/:review_id", deleteSellerReviewController);

userRouter.put("/products/update/:user_id", updateProductReviewController);
userRouter.put("/sellers/update/:user_id", updateSellerReviewController);

export default userRouter;