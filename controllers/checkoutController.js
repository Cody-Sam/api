const asyncHandler = require("express-async-handler");
const ProductModel = require("../db/models/productModel");
const { productIndex } = require('./productController')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE)

const createCheckoutSession = asyncHandler(async (req, res) => {
  try {
    const storeItems = await ProductModel.find()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.find(storeItem => storeItem._id.toString() === item._id)
        console.log(storeItem)
        return {
          price_data: {
            currency: "aud",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.price,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.CLIENT_URL}/cart/checkout/success`,
      cancel_url: `${process.env.CLIENT_URL}/cart/checkout/failure`,
    })
    res.json({ url: session.url })
  }
  catch (err) {
    console.error(err)
  }
})

module.exports = {
    createCheckoutSession
}