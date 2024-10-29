const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/account.controller");
const multer = require("multer");
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() }); // Use the storage configuration
console.log(upload);




router.get("/", controller.index);

router.post("/create", upload.single("avatar"), controller.createPost);

module.exports = router;
