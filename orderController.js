const Order = require("../models/Order");
const mockStore = require("../data/mockStore");
const { getMongoStatus } = require("../config/db");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  try {
    if (!getMongoStatus()) {
      const order = mockStore.createOrder({
        user: req.user._id,
        userName: req.user.name,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
      });
      return res.status(201).json(order);
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: paymentMethod !== "Cash on Delivery",
      paidAt: paymentMethod !== "Cash on Delivery" ? Date.now() : null
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    if (!getMongoStatus()) {
      const order = mockStore.getOrderById(req.params.id);
      if (order) {
        return res.json(order);
      }
      return res.status(404).json({ message: "Order not found" });
    }

    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    const order = mockStore.getOrderById(req.params.id);
    if (order) return res.json(order);
    res.status(404).json({ message: "Order not found" });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    if (!getMongoStatus()) {
      const orders = mockStore.getUserOrders(req.user._id);
      return res.json(orders);
    }

    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    if (!getMongoStatus()) {
      const orders = mockStore.getAllOrders();
      return res.json(orders);
    }

    const orders = await Order.find({})
      .populate("user", "id name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    if (!getMongoStatus()) {
      const order = mockStore.updateOrderStatus(req.params.id, status);
      if (order) {
        return res.json(order);
      }
      return res.status(404).json({ message: "Order not found" });
    }

    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = status;
      if (status === "Delivered") {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }
      if (status === "Shipped" || status === "Delivered") {
        order.isPaid = true;
        if (!order.paidAt) order.paidAt = Date.now();
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
};
