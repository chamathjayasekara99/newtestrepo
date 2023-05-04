import User from "../models/user.model";
import bcrypt from "bcrypt";
import { getOneUser, createUser } from "../repository/user.repository";
import { createAdmin } from "../repository/admin.repository";
import { createCustomer } from "../repository/customer.repository";
import { insertFarmer } from "../repository/farmer.repository";

export const loginUser = async ({ email, password }) => {
  const user = await getOneUser({ email }, true);

  if (!user) return false;
  const isPasswordMatch = await new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  if (!isPasswordMatch) return false;
  delete user.password;
  return user;
};

export const registerUser = async ({ user, specificData }) => {
  const encryptedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(
      user.password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS),
      (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      }
    );
  });

  if (user.role === "CUSTOMER") {
    var newCustomer = await createCustomer(specificData);
  } else if (user.role === "ADMIN") {
    var newAdmin = await createAdmin(specificData);
  } else if (user.role === "FARMER") {
    var newFarmer = await insertFarmer(specificData);
  }

  const registeredUser = await createUser({
    ...user,
    password: encryptedPassword,
    admin: user.role === "ADMIN" ? newAdmin._id : null,
    customer: user.role === "CUSTOMER" ? newCustomer._id : null,
    farmer: user.role === "FARMER" ? newFarmer._id : null,
  });

  return registeredUser;
};
