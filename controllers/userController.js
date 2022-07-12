const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const UserModel = require("../db/models/userModel");

// @desc Return list of all users
// @route get /api/v1/users
// @access admin

const usersIndex = asyncHandler(async (req, res) => {
  res.send(await UserModel.find())
})

// @desc Register new user
// @route post /api/v1/users
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, admin } = req.body;
  if (!name || !email || !password || !admin) {
    res.status(400).json({message: "Please add all fields"});
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(400).json({message: "User already exists"});
    throw new Error("User already exists");
  }

  // Hash the password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    admin
  });

  if (user) {
    res.status(201).json([{
      _id: user.id,
      name: user.name,
      email: user.email,
    }, {
      token: generateToken(user._id),
    }]);
  } else {
    res.status(400).json({ message: "Invalid user data" });
    throw new Error("Invalid user data");
  }
});

// @desc Login user
// @route post /api/v1/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json([{
      _id: user.id,
      name: user.name,
      email: user.email
    }, {
      token: generateToken(user._id)
    }]);
  } else {
    res.status(400).json({ message: "Invalid email or password" });
    throw new Error("Invalid email or password");
  }
});

// @desc Return current user
// @route get /api/v1/users/me
// @access private

const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await UserModel.findById(req.user.id)
    res.status(201).json({
        id: _id,
        name,
        email
    })
});

// @desc Update user
// @route put /api/v1/users/
// @access owner or admin

const updateUser = asyncHandler(async (req, res) => {
  res.status(201).send(
    await UserModel.findByIdAndUpdate((req.user.admin ? (req.body._id || req.user.id) : req.user.id), req.body, {
      returnDocument: 'after',
    })
  )
})

// @desc Delete user
// @route delete /api/v1/users/
// @access admin

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { _id } = await UserModel.findByIdAndDelete(req.body)
    res.status(201).json({ message: 'success' })
  }
  catch(err) {
    console.log(err)
    res.status(400).json({message: 'User not found'})
  }
})

// Generate JWT

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  usersIndex,
  registerUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser
};
