const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/table.controller")

router.get('/', controller.getTables);
router.get('/getAllTables', controller.getTables1);
router.get('/historyBookingTable/:id', controller.getBookingTable);
router.patch('/status/:id', controller.updateTableStatus);
router.post('/bookingTable', controller.bookingTable);
module.exports = router