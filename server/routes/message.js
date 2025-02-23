const { getMessages } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/getmsg/", getMessages);

module.exports = router;