import Order from "../models/order.model.js";
import asyncHandler from "../middleware/async.js";
//Create new order
const createOrder = asyncHandler(async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const orderCount = await Order.count();
    newOrder.orderId = "OID00" + (parseInt(orderCount) + 1);
    try {
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    console.log(err);
  }
});

//Get all orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orderId = req.query?.orderId || null;
  try {
    let orders;
    if (orderId) {
      orders = await Order.find({ orderId }).populate.populate(
        "products.product"
      );
    } else {
      orders = await Order.find().populate("products.product").populate("userId");
    }
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get order by order id
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId }).populate(
      "products.product"
    );

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (order) {
      order.orderStatus = req.body.orderStatus;
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete order
const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (order) {
      await order.remove();
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get total sales
const getTotalSales = asyncHandler(async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
    ]);
    if (!totalSales) {
      res.status(400).json({ message: "The order sales cannot be generated" });
    } else {
      res.status(200).json({ totalSales: totalSales.pop().totalSales });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getTotalSales,
};
