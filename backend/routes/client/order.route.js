const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/orders.controller")

router.get("/",controller.index);
router.get("/:user_id",controller.orderByUserId);



module.exports = router