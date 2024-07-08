const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  getAlladmin,
  forgotPassword,
  resetPassword
} = require("../controller/userController");

const router = require("express").Router();

// Authentication routes
router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.get("/alladmin/:id", getAlladmin);
router.post("/setavatar/:id", setAvatar);
router.post("/forgot", forgotPassword);
router.post("/reset-password/:userId/:token", resetPassword);

router.get("/logout/:id", logOut);

module.exports = router;
