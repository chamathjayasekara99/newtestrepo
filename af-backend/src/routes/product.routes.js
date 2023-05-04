import express from "express";
import { v4 as uuidv4 } from "uuid";
//   getProductByCategory,
//   getProductByPrice,
//   postAddProduct,
//

// getSingleProduct
import {
  getAllProducts,
  postAddProduct,
  editProduct,
  deleteProduct,
  getAllProductsOnSale,
  getSingleProduct,
  updateProductVisibility,
} from "../controllers/product.controller";
import { protect, adminProtect, farmerProtect } from "../middleware/auth.js";

const productRouter = express.Router();

// Get all products
productRouter.get("/products", getAllProducts);

// Get all products for a specific farmer
productRouter.get(
  "/farmers/:farmerId/products",
  protect,
  farmerProtect,
  getAllProducts
);

// Get a single product by ID
productRouter.get("/products/:id", getSingleProduct);

// Add a new product
productRouter.post("/products", protect, farmerProtect, postAddProduct);

// Update an existing product
productRouter.put("/products/:id", protect, farmerProtect, editProduct);

// Delete a product by ID
productRouter.delete("/products/:id", protect, farmerProtect, deleteProduct);

// Get all products on sale
productRouter.get("/products/on-sale", getAllProductsOnSale);

// Update the visibility status of a product
productRouter.patch("/products/:id/visibility", protect, adminProtect, updateProductVisibility);

export default productRouter;
