import { updateFarmerProduct } from "../dal/farmer.dal.js";

// add product to farmer
export const addFarmerProduct = async (farmerID, productID) => {
  return await updateFarmerProduct(farmerID, productID);
};

//remove product from farmer
export const pullFarmerProduct = async (farmerID, productID) => { 
  return await removeFarmerProduct(farmerID, productID);
}

























export const createFarmer = async (data) => {
  const farmer = await findFarmer({ email: data.email });
  if (farmer)
    return { status: 409, message: "This farmer email already exists" };

  const farmerExist = await findFarmer({ name: data.name });
  // 409 - indicating a conflict with the current state of the resource
  if (farmerExist)
    return { status: 409, message: "This farmer name already exists" };

  return await insertFarmer({ ...data });
};

export const retrieveAllFarmers = async (data) => {
  return {
    status: 200,
    data: await getAllFarmers(data),
    message: "All farmers retrieved successfully",
  };
};

export const getFarmerDetails = async (farmer_id) => {
  const result = await findFarmer({ _id: farmer_id });

  if (!result) {
    return {
      status: 404,
      message: "This farmer details do not exist",
    };
  }

  return {
    status: 200,
    data: result,
    message: "Farmer details retrieved successfully",
  };
};

