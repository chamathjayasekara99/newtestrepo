import Farmer from "../models/farmer.model";

export const getAllFarmers = async (data) => {
  return await Farmer.find(data);
};

export const insertFarmer = async (data) => {
  return await new Farmer(data).save();
};

export const findFarmer = async (filters) => {
  return await Farmer.findOne(filters);
};

export const findAndUpdateFarmerProduct = async (farmerID, productID, type) => {
  let updateOperator = {};
  if (type === "REMOVE") {
    updateOperator = { $pull: { products: productID } };
  } else if (type === "ADD") {
    updateOperator = { $push: { products: productID } };
  } else {
    return {
      status: 400,
      error: "Invalid update type",
    };
  }

  try {
    const updatedFarmer = await Farmer.findOneAndUpdate(
      { _id: farmerID },
      updateOperator,
      { new: true }
    );

    return {
      status: 200,
      data: updatedFarmer,
      success: "Farmer updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      error: "Error updating farmer",
    };
  }
};
