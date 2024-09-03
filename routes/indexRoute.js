const express = require("express");
const router = express.Router();

router.use("/", require("./crudRoute"));

module.exports = router;
