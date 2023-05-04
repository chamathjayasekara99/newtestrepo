import { queryAllProducts, addProduct } from "../dal/product.dal.js";
import { addFarmerProduct, pullFarmerProduct } from "../services/farmer.service.js";

export const fetchAllProducts = async (sellerId) => {
  return await queryAllProducts(sellerId);
};

export const createProduct = async (data) => {
  return await addProduct(data);
};

export const addProductToFarmer = async (farmerID, productID) => {
  return await addFarmerProduct(farmerID, productID);
};

export const  deletProductFromFarmer = async (farmerID, productID) => {
  return await pullFarmerProduct(farmerID, productID);
}