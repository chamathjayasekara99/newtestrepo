import {
  getAllReviewsRepository,
  createProductReviewRepository,
  deleteProductReviewRepository,
  updateProductReviewRepository,
  createSellerReviewRepository,
  deleteSellerReviewRepository,
  updateSellerReviewRepository,
  getReviewByIdRepository,
  getReviewsRepository,
} from "../repository/review.repository.js";

export const getAllReviewsService = async () => {
  const reviews = await getAllReviewsRepository();
  return reviews;
};

export const getReviewsService = async (reviewData) => {
  return await getReviewsRepository(reviewData);
};

export const getReviewByIdService = async (review_id) => {
  const review = await getReviewByIdRepository(review_id);
  return review;
};

export const createProductReviewService = async (review) => {
  const { product } = review;
  return await createProductReviewRepository(review, product._id);
};

export const createSellerReviewService = async (review) => {
  const { seller } = review;
  return await createSellerReviewRepository(review, seller._id);
};

export const deleteProductReviewService = async (review_id) => {
  return await deleteProductReviewRepository(review_id);
};

export const deleteSellerReviewService = async (review_id) => {
  return await deleteSellerReviewRepository(review_id);
};

export const updateProductReviewService = async (user_id, reviewData) => {
  const { _id } = reviewData;
  return await updateProductReviewRepository(_id, user_id, reviewData);
};

export const updateSellerReviewService = async (user_id, reviewData) => {
  const { _id } = reviewData;
  return await updateSellerReviewRepository(_id, user_id, reviewData);
};
