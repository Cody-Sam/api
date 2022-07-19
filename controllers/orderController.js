const asyncHandler = require("express-async-handler");
const OrderModel = require("../db/models/orderModel");

// @desc Return list of all orders
// @route get /api/v1/orders
// @access admin

const orderIndex = asyncHandler(async (req, res) => {
    res.send(await OrderModel.find())
})

// @desc Return single order
// @route get /api/v1/orders/:id
// @access admin, owner of order

const getOrder = asyncHandler(async (req, res) => { })

const getMyOrders = asyncHandler(async (req, res) => {
  res.send(await OrderModel.find({ userId: req.user.id }));
});

const getPurchase = asyncHandler(async (req, res) => {
    try {
        const orders = await OrderModel.find({ userId: req.user.id });
        res.send(orders[orders.length-1])
    }
    catch (err) {
        console.log(err)
    }
});

// @desc Create order
// @route post /api/v1/orders
// @access Logged in user

// const createOrder = asyncHandler(async (req, res) => {});
const createOrder = async (customer) => {
    const items = JSON.parse(customer.metadata.cart)
    let total
    items.forEach(item => {
        total = (item.quantity * item.price)
    })
    const newOrder = new OrderModel({
        userId: customer.metadata.userID,
        products: items,
        total: total
    })

    try {
      const savedOrder = await newOrder.save();
    }
    catch (err) {
        console.log(err)
    }
}

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
  getMyOrders,
  getPurchase,
  createOrder,
  updateOrder,
  deleteOrder,
};