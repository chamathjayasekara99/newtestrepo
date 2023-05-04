import {
  findProducts,
  getProductByProductId,
  retriveOnSaleProduct,
  createProduct,
  getRemovedProduct,
} from "../repository/product.repository";

export const allOnSaleProduct = async () => {
  try {
    //get all on sale products
    const result = await retriveOnSaleProduct();

    return {
      status: 200,
      data: result.data,
      success: "All on sale products",
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
      success: "All products",
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
      success: "Product found",
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
//add product
export const addProduct = async (product, farmerId) => {
  // define an prodyct object
  const newProduct = {
    pPid: `PID${uuidv4()}`,
    pName: product.pName,
    pDescription: product.pDescription,
    pStatus: product.pStatus,
    pCategory: product.pCategory,
    pQuantity: product.pQuantity,
    pPrice: product.pPrice,
    pOffer: product.pOffer,
    pWeight: product.pWeight,
    pImages: product.pImages,
    pFarmer: farmerId,
  };
  //create the product and return the product
  const createdProduct = await createProduct(newProduct);
  //check if the product is created if created add the product to the farmer collection else return error
  if (createdProduct) {
    const result = await editFarmerProducts(
      "ADD",
      createdProduct._id,
      farmerId
    );
    return result;
  } else {
    return {
      status: 500,
      error: "Internal Server Error creating product",
    };
  }
};
// remove product
export const removeProduct = async (product_id, farmerId) => {
  //check if the product exist if exist remove the product else return error
  const result = await fetchProductById(product_id);
  if (!(result.status == 200)) {
    return result;
  }
  //remove the product from the product collection
  const editFarmerResult = await editFarmerProducts(
    "REMOVE",
    product_id,
    farmerId
  );

  //check if the product is removed from the farmer collection if removed return the product else return error

  if (editFarmerResult.status == 200) {
    const deleteProduct = await getRemovedProduct(product_id);

    if (deleteProduct) {
      return {
        status: 200,
        data: deleteProduct,
        success: "Product deleted successfully",
      };
    } else {
      const result = await editFarmerProducts("ADD", product_id, farmerId);
      //if product adding again is successful return error else return product adding error
      if (result.status == 200) {
        return {
          status: 500,
          error: "Internal Server Error deleting product",
        };
      } else {
        return {
          status: result.status,
          error: result.error + " product adding again failed",
        };
      }
    }
  } else {
    return result;
  }
};

//update product
export const updateProduct = async (product_id, productData) => {
  const result = await fetchProductById(product_id);
  if (!(result.status == 200)) {
    return result;
  }

  result.data.pName = productData.pName;
  result.data.pDescription = productData.pDescription;
  result.data.pStatus = productData.pStatus;
  result.data.pCategory = productData.pCategory;
  result.data.pQuantity = productData.pQuantity;
  result.data.pPrice = productData.pPrice;
  result.data.pOffer = productData.pOffer;
  result.data.pWeight = productData.pWeight;
  result.data.pImages = productData.pImages;
  const updatedProduct = await getUpdatedProduct(result.data);
    if (updatedProduct) {
        return {
            status: 200,
            data: updatedProduct,
            success: "Product updated successfully",
        };
    } else { 
        return {
            status: 500,
            error: "Internal Server Error updating product",
        };
    }
};
