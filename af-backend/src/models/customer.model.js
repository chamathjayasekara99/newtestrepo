import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  shippingAddress: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
