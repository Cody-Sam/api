const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserModel = require("../db/models/userModel");

const adminProtect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserModel.findById(decoded.id).select("-password");
      
      if (req.user.admin) {
          next()
      } else {
        res.status(401), json({ message: "Not admin" });
        throw new Error('Not admin')
        }
    } catch (err) {
      res.status(401).json({message: "not authorized"});
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401).json({message: "Not authorized, no token"});
    throw new Error("Not authorized, no token");
  }
});

module.exports = { adminProtect };