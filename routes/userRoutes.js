const express = require("express");
const router = express.Router();
const UserModel = require("../db/models/userModel");
const { usersIndex, registerUser, loginUser, getMe, deleteUser } = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')
const {adminProtect} = require('../middleware/adminOnlyMiddleware')

router.get('/', adminProtect, usersIndex)
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.delete('/', adminProtect, deleteUser)


module.exports = router;