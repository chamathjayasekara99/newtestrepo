import {
  findProducts,
  getProductByProductId,
  retriveOnSaleProduct,
} from "../repository/product.repository";

export const allOnSaleProduct = async () => {
  try {
    //get all on sale products
    const result = await retriveOnSaleProduct();


    return {
      status: 200,
      data: result.data,
      success: true,
    };
  } catch (error) {
    if (error.status === 404) {
      return {
        status: 404,
        error: "No on sale products found",
      };
    } else {
      return {
        status: 500,
        error: "Internal Server Error fetching  all on products",
      };
    }
  }
};
export const fetchAllProducts = async (farmerId) => {
  try {
    //get the products
    const reuslt = await findProducts(farmerId);
    //check if the products exist if exist return the products else return error

    return {
      status: 200,
      data: reuslt,
      success: true,
    };
  } catch (error) {
    if (error.status === 404) {
      return {
        status: 404,
        error: "No products found",
      };
    } else {
      return {
        status: 500,
        error: "Internal Server Error fetching products",
      };
    }
  }
};
//get product by id
export const fetchProductById = async (productId) => {
  //get the product and return if it exist else return error
  try {
    const result = await getProductByProductId(productId);

    return {
      status: 200,
      data: result,
      success: true,
    };
  } catch (error) {
    if (error.status === 404) {
      return {
        status: 404,
        error: "No product found",
      };
    } else {
      return {
        status: 500,
        error: "Internal Server Error get product by id",
      };
    }
  }
};
//update product visibility
export const makeProductVisible = async (productId) => {
  //get the product and update the visibility and return the updated product
  const result = await fetchProductById(productId);
  //check if the product exist if exist update the visibility else return error
  if (result.status === 200) {
    const updatedResult = updateVisiblity(result.data);
    if (updatedResult) {
      return {
        status: 200,
        data: updatedResult,
        success: true,
      };
    } else {
      return {
        status: 500,
        error: "Internal Server Error updating product visibility",
      };
    }
  } else if (result.status === 404) {
    return {
      status: 404,
      error: "Product not found",
    };
  } else {
    return {
      status: 500,
      error: "Internal Server Error getting product by id ",
    };
  }
};
export const createProduct = async (product) => {};
