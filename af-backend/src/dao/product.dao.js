import Product from "../models/product.model";

export const findProducts = async (sellerId) => {
  try {
    let products = null;

    if (sellerId) {
      products = await Product.find({
        pSeller: sellerId,
      }).sort({
        _id: -1,
      });
    } else {
      products = await Product.find().sort({ _id: -1 });
    }

    if (!products) {
      return {
        status: 404,
        error: "No products found",
      };
    }

    return {
      status: 200,
      data: products,
      success: "All products",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      error: "Internal server error",
    };
  }
};

export const insertProduct = async (data) => { 
    try {
        let product = await new Product(data).save();
        return {
            status: 201,
            data: product,
            success: "Product created successfully"
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            error: "Internal server error"
        }
    }
}