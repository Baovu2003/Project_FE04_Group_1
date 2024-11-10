const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/orders.controller")

router.get("/",controller.index);



module.exports = router