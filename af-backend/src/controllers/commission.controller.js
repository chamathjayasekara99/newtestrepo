import asyncHandler from "../middleware/async";
import { makeResponse } from "../utils/response";
import {
  getCommissionService,
  addCommissionService,
  updateCommissionService,
} from "../services/commission.service";

export const getCommission = asyncHandler(async (req, res) => {
  const result = await getCommissionService();
  if (result)
    return makeResponse({
      res,
      status: 200,
      data: {
        data: result,
        message: "Commission retrieved successfully",
      },
    });
  return makeResponse({
    res,
    status: 404,
    data: {
      message: "Commission not found",
    },
  });
});

export const addCommission = asyncHandler(async (req, res) => {
  const result = await addCommissionService(req.body);
  if (result)
    return makeResponse({
      res,
      status: 201,
      data: {
        data: result,
        message: "Commission added successfully",
      },
    });
});

export const updateCommission = asyncHandler(async (req, res) => {
  const result = await updateCommissionService(req.params, req.body);
  if (result)
    return makeResponse({
      res,
      status: 200,
      data: {
        data: result,
        message: "Commission updated successfully",
      },
    });
});
