const asyncHandler = require("express-async-handler");
const OrderModel = require("../db/models/orderModel");
const ProductModel = require("../db/models/productModel")

// @desc Return list of all orders
// @route get /api/v1/orders
// @access admin

const orderIndex = asyncHandler(async (req, res) => {
    res.send(await OrderModel.find())
})

// @desc Return single order
// @route get /api/v1/orders/:id
// @access admin, owner of order

const getOrder = asyncHandler(async (req, res) => {
    const order = await OrderModel.find({_id: req.params.id})
    res.send(order[0])
})

// @desc Return user's orders
// @route get /api/v1/orders/me
// @access owner of orders

const getMyOrders = asyncHandler(async (req, res) => {
    res.send(await OrderModel.find({ userId: req.user.id }));
});

// @desc Return order after payment completed
// @route get /api/v1/orders/purchase
// @access owner of purchase

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

const createOrder = async (customer) => {
    const items = JSON.parse(customer.metadata.cart)
    items.forEach(async (item) => {
        await ProductModel.findByIdAndUpdate(item._id, {
          $inc: { quantity: -item.quantity, sold: item.quantity },
        });
    })
    let total
    items.forEach((item) => {
        total = (item.quantity * item.price)
    })
    const newOrder = await new OrderModel({
        userId: customer.metadata.userID,
        products: items,
        total: total,
        status: "unfulfilled",
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

const updateOrder = asyncHandler(async (req, res) => {
    // try {
    //     res.status(201).send()
    // }
    // catch (err) {
    //     console.error(err.message)
    // }
});

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