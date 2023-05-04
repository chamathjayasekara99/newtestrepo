import {
  createPaymentRepository,
  updatePaymentRepository,
} from "../repository/payment.repository";

export const createPaymentService = async (payment) => {
  return await createPaymentRepository(payment);
};

export const updatePaymentService = async (id, payment) => {
  return await updatePaymentRepository(id, payment);
};
