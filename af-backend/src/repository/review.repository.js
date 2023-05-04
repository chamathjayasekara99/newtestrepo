import Review from "../models/review.model";
import Product from "../models/product.model";
import Farmer from "../models/farmer.model";
import logger from "../utils/logger";

// Get the current highest review ID from the database
const getMaxReviewId = async () => {
  const result = await Review.findOne()
    .sort({ reviewID: -1 })
    .select('reviewID')
    .exec();
  if (result) {
    const currentId = result.reviewID;
    const numericPart = parseInt(currentId.slice(1));
    return numericPart;
  } else {
    return 0;
  }
};

export const getAllReviewsRepository = async () => {
  try {
    const reviews = await Review.find({});
    return {
      status: 200,
      data: reviews,
      message: "All reviews retrieved successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when retrieving all reviews - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not retrieve all reviews",
    };
  }
};

export const getReviewByIdRepository = async (review_id) => {
  try {
    const review = await Review.findById(review_id);
    if (!review) {
      return {
        status: 404,
        message: "Review not found",
      };
    }
    return {
      status: 200,
      data: review,
      message: "Review retrieved successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when retrieving a review by id - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not retrieve the review",
    };
  }
};

export const getReviewsRepository = async (reviewData) => {
  console.log("review data in repo", reviewData);
  try {
    const reviews = await Review.find(reviewData)
    .populate("user")
    .exec();
    if (!reviews) {
      return {
        status: 404,
        message: "Reviews not found",
      };
    }
    return {
      status: 200,
      data: reviews,
      message: "Reviews retrieved successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when retrieving reviews - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not retrieve the reviews",
    };
  }
};

export const createProductReviewRepository = async (reviewData, product_id) => {
  const product = await Product.findById(product_id);
  if (!product) {
    return {
      status: 404,
      message: "Product not found",
    };
  }
  const maxReviewId = await getMaxReviewId();
  const nextId = `R${(maxReviewId + 1).toString().padStart(3, '0')}`;
  const review = new Review({
    ...reviewData,
    product: product_id,
    reviewID: nextId,
  });

  try {
    const savedReview = await review.save();
    // Add the new review to the product's pReviews array
    product.pReviews.push(savedReview._id);
    await product.save();
    return {
      status: 200,
      data: savedReview,
      message: "Product Review created successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when creating a product review - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not create the product review",
    };
  }
};

export const createFarmerReviewRepository = async (reviewData, farmer_id) => {
  const farmer = await Farmer.findById(farmer_id);
  if (!farmer) {
    return {
      status: 404,
      message: "Farmer not found",
    };
  }
  const maxReviewId = await getMaxReviewId();
  const nextId = `R${(maxReviewId + 1).toString().padStart(3, '0')}`;
  const review = new Review({
    ...reviewData,
    farmer: farmer_id,
    reviewID: nextId,
  });

  try {
    const savedReview = await review.save();
    // Add the new review to the farmer's sReviews array
    farmer.farmerReviews.push(savedReview._id);
    await farmer.save();
    return {
      status: 200,
      data: savedReview,
      message: "Farmer Review created successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when creating a farmer review - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not create the farmer review",
    };
  }
};

export const deleteProductReviewRepository = async (review_id) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(review_id);
    if (!deletedReview) {
      return {
        status: 404,
        message: "Review not found",
      };
    }
    await Product.updateOne(
      { _id: deletedReview.product },
      { $pull: { pReviews: deletedReview._id } }
    );
    return {
      status: 200,
      data: deletedReview,
      message: "Product Review deleted successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when deleting a product review - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not delete the product review",
    };
  }
};

export const deleteFarmerReviewRepository = async (review_id) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(review_id);
    if (!deletedReview) {
      return {
        status: 404,
        message: "Review not found",
      };
    }
    await Farmer.updateOne(
      { _id: deletedReview.farmer },
      { $pull: { farmerReviews: deletedReview._id } }
    );
    return {
      status: 200,
      data: deletedReview,
      message: "Farmer Review deleted successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when deleting a farmer review - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not delete the farmer review",
    };
  }
};

export const updateProductReviewRepository = async (
  review_id,
  user_id,
  reviewData
) => {
  try {
    const review = await Review.findById(review_id);
    //check if the review exists
    if (!review) {
      return {
        status: 404,
        message: "Review not found",
      };
    }
    //check if the user created the review
    if (review.user.toString() !== user_id) {
      return {
        status: 401,
        message: "User not authorized",
      };
    }
    //check if the product exists
    const product = await Product.findById(review.product);
    if (!product) {
      return {
        status: 404,
        message: "Product not found",
      };
    }
    //check if the review exists in the product's pReviews array
    const existingReview = product.pReviews.find(
      (r) => r.toString() === review_id
    );
    if (!existingReview) {
      return {
        status: 404,
        message: "Review not found for this product",
      };
    }
    //update the review
    const updatedReview = await Review.findByIdAndUpdate(
      review_id,
      reviewData,
      { new: true }
    );
    return {
      status: 200,
      data: updatedReview,
      message: "Product Review updated successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when updating a product review - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not update the product review",
    };
  }
};

export const updateFarmerReviewRepository = async (
  review_id,
  user_id,
  reviewData
) => {
  try {
    const review = await Review.findById(review_id);
    //check if the review exists
    if (!review) {
      return {
        status: 404,
        message: "Review not found",
      };
    }
    //check if the user created the review
    if (review.user.toString() !== user_id) {
      return {
        status: 401,
        message: "User not authorized",
      };
    }
    //check if the farmer exists
    const farmer = await Farmer.findById(review.farmer);
    if (!farmer) {
      return {
        status: 404,
        message: "Farmer not found",
      };
    }
    //check if the review exists in the farmer's farmerReviews array
    const existingReview = farmer.farmerReviews.find(
      (r) => r.toString() === review_id
    );
    if (!existingReview) {
      return {
        status: 404,
        message: "Review not found for this farmer",
      };
    }
    //update the review
    const updatedReview = await Review.findByIdAndUpdate(
      review_id,
      reviewData,
      { new: true }
    );
    return {
      status: 200,
      data: updatedReview,
      message: "Farmer Review updated successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when updating a farmer review - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not update the farmer review",
    };
  }
};
