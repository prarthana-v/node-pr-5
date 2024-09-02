const express = require("express");
const router = express.Router();
const cc = require("../controllers/crudController");

router.get("/", cc.form);

module.exports = router;
