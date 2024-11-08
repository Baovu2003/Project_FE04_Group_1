const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/product.controller");

router.get("/", controller.index);
router.get("/detail/:slugProduct", controller.detail);
router.get("/getProductByid/:id", controller.getProductByid);
module.exports = router;
