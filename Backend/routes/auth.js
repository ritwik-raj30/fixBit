const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  getAlladmin,
  forgotPassword,
  resetPassword,
  verifyEmail, decodeToken
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
// Route to send email verification link
router.post('/emailvalidate', verifyEmail);

// Route to handle token verification and redirect to registration
router.get('/verify-email/:token', decodeToken);
module.exports = router;
