import Review from "../models/review.model";
import Product from "../models/product.model";
import Farmer from "../models/farmer.model";
import logger from "../utils/logger";

// Get the current highest review ID from the database
const getMaxReviewId = async () => {

};

export const getAllReviewsRepository = async () => {

};

export const getReviewByIdRepository = async (review_id) => {

};

export const getReviewsRepository = async (reviewData) => {

};

export const createProductReviewRepository = async (reviewData, product_id) => {

};

export const createFarmerReviewRepository = async (reviewData, farmer_id) => {

};

export const deleteProductReviewRepository = async (review_id) => {

};

export const deleteFarmerReviewRepository = async (review_id) => {

};

export const updateProductReviewRepository = async (
  review_id,
  user_id,
  reviewData
) => {

};

export const updateFarmerReviewRepository = async (
  review_id,
  user_id,
  reviewData
) => {

};
