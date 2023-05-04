import { updateFarmerProducts } from "../repository/farmer.repository";

export const editFarmerProducts = async (type, product_id, farmerId) => {
  try {
    const updateFarmer = await updateFarmerProducts(type, product_id, farmerId);
    return {
      status: 200,
      data: updateFarmer,
      success: `Product ${type}d successfully`,
    };
  } catch (error) {
    if (error.status === 404) {
      return {
        status: 404,
        error: "Farmer not found",
      };
    } else {
      return {
        status: 500,
        error: "Internal Server Error update product of farmer",
      };
    }
  }
};
