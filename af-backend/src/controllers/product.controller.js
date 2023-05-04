import Product from "../models/product.model";
import Seller from "../models/seller.model";
import asyncHandler from "../middleware/async.js";
import { v4 as uuidv4 } from "uuid";
import { makeResponse } from "../utils/response";
import { fetchAllProducts, createProduct } from "../services/product.service";
export const getAllProducts = asyncHandler(async (req, res) => {
  const result = fetchAllProducts(req?.user?.seller._id);

  if (result.status == 200) {
    makeResponse({
      res,
      status: result.status,
      data: result.data,
      success: "All Products",
    });
  } else if (result.status == 500) {
    makeResponse({
      res,
      status: result.status,
      error: "Server error",
    });
  } else {
    makeResponse({
      res,
      status: result.status,
      error: result.error,
    });
  }
});

export const getProductCount = async () => {
  try {
    let count = await Product.count();
    return count;
  } catch (err) {
    console.log(err);
  }
};

export const postAddProduct = asyncHandler(async (req, res) => {
  const { farmer } = req.user;

  // create a new product object with any relevant data
  const newProduct = new Product({
    pPid: `PID${uuidv4()}`,
    pName: req.body.pName,
    pDescription: req.body.pDescription,
    pStatus: req.body.pStatus,
    pCategory: req.body.pCategory,
    pQuantity: req.body.pQuantity,
    pPrice: req.body.pPrice,
    pOffer: req.body.pOffer,
    pWeight: req.body.pWeight,
    pImages: req.body.pImages,
    pFarmer: farmer._id,
    // ... other properties of the product
  });
  try {
    const result = await createProduct(newProduct);
    if (result.status == 201) {
      const response = await addProductToFarmer(farmer._id, result.data._id);
      if (response.status == 200) {
        return makeResponse({
          res,
          status: result.status,
          data: result.data,
          success: "Product created successfully",
        });
      } else {
        return makeResponse({
          res,
          status: response.status,
          error: response.error,
        });
      }
    } else {
      return makeResponse({
        res,
        status: result.status,
        error: result.error,
      });
    }
  } catch (err) {
    console.log(err);
    return makeResponse({
      res,
      status: 500,
      error: "Server error",
    });
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { seller } = req.user;
  const { id } = req.params;

  try {
    // find the product by id and delete it
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      // once the product is deleted successfully, remove it from the seller's product list
      Seller.findOneAndUpdate(
        { _id: seller._id },
        { $pull: { products: id } },
        { new: true },
        (err, updatedSeller) => {
          if (err) {
            console.log(err);
            // handle any errors that occur
            return res.status(500).json({ error: "Error updating seller" });
          }

          // return a success response with the updated seller object
          return res
            .status(200)
            .json({ success: "Product deleted successfully" });
        }
      );
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error deleting product" });
  }
});

export const editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const editedProduct = Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json({ success: "Product edit successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error editing product" });
  }
});

export const getAllProductsOnSale = asyncHandler(async (req, res) => {
  try {
    let Products = await Product.find({ pSaleStatus: true }).sort({ _id: -1 });
    if (Products) {
      makeResponse({
        res,
        status: 200,
        data: Products,
        success: "All Products",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

export const getSingleProduct = asyncHandler(async (req, res) => {
  try {
    let Products = await Product.find({ pPid: req.params.id });
    if (Products) {
      makeResponse({
        res,
        status: 200,
        data: Products,
        success: "All Products",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//update visible status
export const updateProductVisibility = asyncHandler(async (req, res) => {
  try {
    // Find the product with the specified pPid
    let product = await Product.findOne({ pPid: req.body.pPid });

    // If the product exists, update its pVisible field to true
    if (product) {
      product.pVisible = true;
      let updatedProduct = await product.save();
      makeResponse({
        res,
        status: 200,
        data: updatedProduct,
        success: "Product updated successfully",
      });
    } else {
      makeResponse({
        res,
        status: 404,
        error: "Product not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating product" });
  }
});
