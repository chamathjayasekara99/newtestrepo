import Farmer from "../models/farmer.model.js";
export const getFarmer = async (farmerId) => {
  try {
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      const error = new Error("Farmer not found");
      error.status = 404;
      throw error;
    }
    return farmer;
  } catch (error) {
    throw error;
  }
};

export const updateFarmerProducts = async (type, product_id, farmerId) => {
  const updateOperation = null;
  if (type == "REMOVE") {
    updateOperation = { $pull: { products: product_id } };
  } else if (type == "ADD") {
    updateOperation = { $push: { products: product_id } };
  }

  try {
    const result = await Farmer.findByIdAndUpdate(farmerId, updateOperation, {
      new: true,
    });
    if (!result) {
      const error = new Error("Farmer not found");
      error.status = 404;
      throw error;
    }
    return result;
  } catch (error) {
    throw error;
  }
};
