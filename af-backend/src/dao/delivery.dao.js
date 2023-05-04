import Delivery from "../models/delivery.model";
import logger from "../utils/logger";

export const getAllDeliveryRepository = async () => {
  try {
    const allDeliveries = await Delivery.find({});
    return allDeliveries;
  } catch (err) {
    console.error(
      `An error occurred when retrieving all deliveries - err: ${err.message}`
    );
    return null;
  }
};

export const createDeliveryRepository = async (delivery) => {
  const newDelivery = new Delivery(delivery);
  if (!newDelivery) return null;

  try {
    const savedDelivery = await newDelivery.save();
    return savedDelivery;
  } catch (err) {
    console.error(
      `An error occurred when creating a delivery - err: ${err.message}`
    );
    return null;
  }
};

export const getDeliveryByDeliveryIdRepository = async (delivery_id) => {
  try {
    const delivery = await Delivery.findById(delivery_id);
    if (!delivery) {
      return null;
    }
    return delivery;
  } catch (err) {
    console.error(
      `An error occurred when retrieving a delivery by id - err: ${err.message}`
    );
    return null;
  }
};

export const updateDeliveryRepository = async (delivery) => {
  try {
    // const response = await Delivery.findById(delivery._id);
    // if (!response) {
    //   return {
    //     status: 404,
    //     message: "Delivery not found",
    //   };
    // }
    const updatedDelivery = await Delivery.findByIdAndUpdate(
      { _id: delivery._id },
      delivery,
      {
        new: true,
      }
    );
    return updatedDelivery;
  } catch (err) {
    console.error(
      `An error occurred when updating a delivery - err: ${err.message}`
    );
    return null;
  }
};

export const getDeliveryByIdRepository = async (deliveryData) => {
  try {
    const delivery = await Delivery.find(deliveryData);
    if (!delivery) {
      return null;
    }
    return delivery;
  } catch (err) {
    console.error(
      `An error occurred when retrieving a delivery by id - err: ${err.message}`
    );
    return null;
  }
};
