import User from "../models/user.model";
import logger from "../utils/logger";

export const createUser = async (user) => {
  const userMade = (await new User(user).save()).toObject();
  return userMade;
};

export const getAllUsers = async ({
  sort = {},
  filter = {},
  page,
  limit = 10,
}) => {
};

export const getOneUser = async (filters, returnPassword = false) => {
};

export const findOneAndUpdateUser = async (filters, data) => {
};

export const findOneAndRemoveUser = async (filters) => {

};
