import Customer from "../models/customer.model";
import logger from "../utils/logger";

export const createCustomer = async (customer) => {
  const customerMade = (await new Customer(customer).save()).toObject();
  return customerMade;
};

export const getAllCustomers = async ({
  sort = {},
  filter = {},
  page,
  limit = 10,
}) => {

};

export const getOneCustomer = async (filters, returnPassword = false) => {

};

export const findOneAndUpdateCustomer = async (filters, data) => {

};

export const findOneAndRemoveCustomer = async (filters) => {

};

