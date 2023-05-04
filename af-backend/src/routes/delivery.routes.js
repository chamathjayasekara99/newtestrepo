import express from "express";
// import { protect, adminProtect } from '../middleware/auth.js'
import {
  getAllDeliveryController,
  getDeliveryByIdController,
  getDeliveryByDeliveryIdController,
  createDeliveryController,
  updateDeliveryController,
  // deleteDeliveryController,
} from "../controllers/delivery.controller";

const useRouter = express.Router();

useRouter.get("/", getAllDeliveryController);
useRouter.get("/read-delivery", getDeliveryByIdController);
useRouter.get("/:delivery_id", getDeliveryByDeliveryIdController);

useRouter.post("/create", createDeliveryController);
useRouter.put("/update", updateDeliveryController);

export default useRouter;
