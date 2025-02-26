const {
  register,
  login,
  logout,
  verifyEmail,
  resetPassword,
  setAvatar,
  getAllUsers
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout/:id", logout);
router.post("/verifyemail", verifyEmail);
router.post("/resetpassword", resetPassword);
router.post("/setavatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);

module.exports = router;
