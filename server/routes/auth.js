const {
  register,
  login,
  fetchAvatars,
  setAvatar,
  getAllUsers
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setavatar/:id", setAvatar);
router.post("/avatars/:id", fetchAvatars);
router.get("/allusers/:id", getAllUsers);

module.exports = router;
