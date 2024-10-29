const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/user.controller");
const validateUser = require("../../validate/Client/user.validate");
router.get("/register", controller.index);
router.get("/:tokenUser", controller.verifyTokenByToken);
router.post("/register", validateUser.registerPost, controller.registerPost);
router.post("/login",controller.loginPost);
module.exports = router;
