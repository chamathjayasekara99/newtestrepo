import { allOnSaleProduct } from "../repository/product.repository";
import { fetchAllProducts } from "../services/product.service";
import { makeResponse } from "../utils/response";

export const getAllProducts = () => {
  const result = fetchAllProducts(req?.user?.seller._id);

  makeResponse({
    res,
    status: result.status,
    data: result.data,
    success: result.success,
    error: result.error,
  });
};
// Function to add a new product
export const postAddProduct = () => {};

// Function to edit an existing product
export const editProduct = () => {};

// Function to delete a product
export const deleteProduct = () => {};

// Function to get all products on sale
export const getAllProductsOnSale = () => {
  const result = allOnSaleProduct();

  return makeResponse({
    res,
    status: result.status,
    data: result.data,
    success: result.success,
    error: result.error,
  });
};

// Function to get a single product by ID
export const getSingleProduct = () => {
  const result = fetchProductById(req.params.productId);

  return makeResponse({
    res,
    status: result.status,
    data: result.data,
    success: result.success,
    error: result.error,
  });
};

// Function to update product visibility
export const updateProductVisibility = () => {
  // mekeProductVisible to all the users
  const result = makeProductVisible(req.params.productId);

  makeResponse({
    res,
    status: result.status,
    data: result.data,
    success: result.success,
    error: result.error,
  });
};
