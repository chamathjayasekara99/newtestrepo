import asyncHandler from "../middleware/async";
import { makeResponse } from "../utils/response";
import {
  createPaymentService,
  updatePaymentService,
} from "../services/payment.service.js";

export const makePayment = asyncHandler(async (req, res) => {
  const result = await createPaymentService(req.body);
  if (result)
    return makeResponse({
      res,
      statusCode: 201,
      data: {
        message: "Payment successful",
        data: result,
      },
    });
});

export const updatePayment = asyncHandler(async (req, res) => {
  const result = await updatePaymentService(req.params, req.body);
  if (result)
    return makeResponse({
      res,
      statusCode: 200,
      data: {
        message: "Payment updated successfully",
        data: result,
      },
    });
});
