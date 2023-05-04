import Payment from "../models/payment.model.js";
import Order from "../models/order.model.js";

const getMessageFromStatusCode = (statusCode) => {
  switch (statusCode) {
    case 2:
      return "success";
    case 0:
      return "pending";
    case -1:
      return "canceled";
    case -2:
      return "failed";
    default:
      return "chargedback";
  }
};

export const createPaymentRepository = async (payment) => {
  const newPayment = new Payment(payment);

  await newPayment.save();
  await Order.findByIdAndUpdate(
    { _id: payment.order_id },
    { paymentStatus: getMessageFromStatusCode(payment.status_code) }
  );
  return newPayment;
};

export const updatePaymentRepository = async (id, payment) => {
  const updatedPayment = await Payment.findByIdAndUpdate(id, payment, {
    new: true,
  });
  if (payment?.status_code)
    await Order.findByIdAndUpdate(
      { _id: updatedPayment.order_id },
      { paymentStatus: getMessageFromStatusCode(updatedPayment.status_code) }
    );
  return updatedPayment;
};
