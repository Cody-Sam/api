const asyncHandler = require("express-async-handler");
const OrderModel = require("../db/models/orderModel");

// @desc Return list of all orders
// @route get /api/v1/orders
// @access admin

const orderIndex = asyncHandler(async (req, res) => {
  res.send(await OrderModel.find());
});

// @desc Return single order
// @route get /api/v1/orders/:id
// @access admin, owner of order

const getOrder = asyncHandler(async (req, res) => {});

// @desc Create order
// @route post /api/v1/orders
// @access Logged in user

const createOrder = asyncHandler(async (req, res) => {});

// @desc Update order
// @route put /api/v1/orders/:id
// @access admin

const updateOrder = asyncHandler(async (req, res) => {});

// @desc Delete order
// @route delete /api/v1/orders/:id
// @access admin

const deleteOrder = asyncHandler(async (req, res) => {});

module.exports = {
  orderIndex,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
