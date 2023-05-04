import Commission from "../models/commission.model";

export const getCommissionRepository = async () => {
  return await Commission.findOne();
};

export const addCommissionRepository = async (commission) => {
  const result = await Commission.findOne();
  if (result !== null) return result;
  return await await new Commission(commission).save();
};

export const updateCommissionRepository = async (id, commission) => {
  return await Commission.findByIdAndUpdate(id, commission, {
    new: true,
  });
};
