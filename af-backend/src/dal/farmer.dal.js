import findAndUpdateFarmerProduct from "../dao/farmer.dao.js";
import { ADD, REMOVE } from "../utils/constants.js";
export const getAllFarmers = async (data) => {};

export const insertFarmer = async (data) => {};

export const findFarmer = async (filters) => {};

// update farmer products
export const updateFarmerProduct = async (farmerID, productID) => {
  return await findAndUpdateFarmerProduct(farmerID, productID, ADD);
};

// remove farmer products
export const removeFarmerProduct = async (farmerID, productID) => {
  return await findAndUpdateFarmerProduct(farmerID, productID, REMOVE);
};
