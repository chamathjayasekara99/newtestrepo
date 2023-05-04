import {
  getAllDeliveryRepository,
  createDeliveryRepository,
  getDeliveryByDeliveryIdRepository,
  updateDeliveryRepository,
  getDeliveryByIdRepository,
} from "../repository/delivery.repository.js";

export const getAllDeliveryService = async () => {
  return await getAllDeliveryRepository();
};

export const createDeliveryService = async (delivery) => {
  return await createDeliveryRepository(delivery);
};

export const getDeliveryByDeliveryIdService = async (delivery_id) => {
  return await getDeliveryByDeliveryIdRepository(delivery_id);
};

export const updateDeliveryService = async (delivery) => {
  return await updateDeliveryRepository(delivery);
};

export const getDeliveryByIdService = async (deliveryData) => {
  return await getDeliveryByIdRepository(deliveryData);
};
