import asyncHandler from "../middleware/async";
import { allOnSaleProduct } from "../repository/product.repository";
import {
  addProduct,
  fetchAllProducts,
  removeProduct,
  updateProduct,
} from "../services/product.service";
import { makeResponse } from "../utils/response";

export const getAllProducts = asyncHandler(async (req, res) => {
  const result = fetchAllProducts(req?.user?.seller._id);

  makeResponse({
    res,
    status: result.status,
    data: result.data,
    success: result.success,
    error: result.error,
  });
});
// Function to add a new product
export const postAddProduct = asyncHandler(async (req, res) => {
  const result = addProduct(req.body, user.farmer._id);
  makeResponse({
    res,
    status: result.status,
    data: result.data,
    success: result.success,
    error: result.error,
  });
});

// Function to edit an existing product
export const editProduct = asyncHandler(async (req, res) => {
  const result = updateProduct(req.params.productId, req.body);
  makeResponse({
    res,
    status: result.status,
    data: result.data,
    success: result.success,
    error: result.error,
  });
});

// Function to delete a product
export const deleteProduct = asyncHandler(async (req, res) => {
  const result = await removeProduct(req.params.productId);
  makeResponse({
    res,
    status: result.status,
    data: result.data,
    success: result.success,
    error: result.error,
  });
});

// Function to get all products on sale
export const getAllProductsOnSale = asyncHandler(async (req, res) => {
  const result = allOnSaleProduct();

  return makeResponse({
    res,
    status: result.status,
    data: result.data,
    success: result.success,
    error: result.error,
  });
});

// Function to get a single product by ID
export const getSingleProduct = asyncHandler(() => {
  const result = fetchProductById(req.params.productId);

  return makeResponse({
    res,
    status: result.status,
    data: result.data,
    success: result.success,
    error: result.error,
  });
});

// Function to update product visibility
export const updateProductVisibility = asyncHandler(() => {
  // mekeProductVisible to all the users
  const result = makeProductVisible(req.params.productId);

  makeResponse({
    res,
    status: result.status,
    data: result.data,
    success: result.success,
    error: result.error,
  });
});
