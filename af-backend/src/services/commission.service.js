import {
  getCommissionRepository,
  addCommissionRepository,
  updateCommissionRepository,
} from "../repository/commission.repository.js";

export const getCommissionService = async () => {
  return await getCommissionRepository();
};

export const addCommissionService = async (data) => {
  return await addCommissionRepository(data);
};

export const updateCommissionService = async (id, data) => {
  return await updateCommissionRepository(id, data);
};
