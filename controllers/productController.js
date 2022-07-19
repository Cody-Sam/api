const asyncHandler = require("express-async-handler");
const ProductModel = require("../db/models/productModel");
const cloudinary = require("../utils/cloudinary");

// @desc Return list of all products
// @route get /api/v1/products
// @access public

const productIndex = asyncHandler(async (req, res) => {
  res.send(await ProductModel.find());
});

// @desc Retrieve individual product
// @route get /api/v1/products/:id
// @access public

const getProduct = asyncHandler(async (req, res) => {
  try {
    res.send(await ProductModel.findById(req.params.id));
  } catch (err) {
    res.status(404).send({ message: `${err}` });
  }
});

// @desc Create new product
// @route post /api/v1/products
// @access admin

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, type, compatibility, image, quantity } = req.body;
  if (!name || !description || !price || !type || !quantity) {
    res.status(400).json({ message: "Please add all fields" });
    throw new Error("Please add all fields");
  }
  // Check if product exists
  const exists = await ProductModel.findOne({ name });
  if (exists) {
    res.status(400).json({ message: "Product already exists" });
    throw new Error("Product already exists");
  }
  
  try {
    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "products",
      width: 300,
      crop: "scale",
    });

    const product = await ProductModel.create({
      name,
      description,
      type,
      price,
      quantity,
      compatibility: compatibility,
      image: {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url
      }
    });
  

    if (product) {
      res.status(201).json({
        url: `${process.env.CLIENT_URL}/shop/item/${product._id}`
      });
    } else {
      res.status(400).json({ message: "Invalid product data" });
      throw new Error("Invalid product data");
    }
  }
  catch (err) {
    res.status(400).json({error: err.message})
  }
});

// @desc Update a product
// @route put /api/v1/products
// @access admin

const updateProduct = asyncHandler(async (req, res) => {
  res.status(201).send(
    await ProductModel.findByIdAndUpdate(req.body._id, req.body, {
      runValidators: true,
      returnDocument: "after",
    })
  );
});

// @desc Delete product
// @route delete /api/v1/products
// @access admin

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { _id } = await ProductModel.findByIdAndDelete(req.body);
    res.status(201).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Product not found" });
  }
});

module.exports = {
  productIndex,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
