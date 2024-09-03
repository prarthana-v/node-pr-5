const express = require("express");
const router = express.Router();
const cc = require("../controllers/crudController");
const multer = require("multer");
const path = require("path");

const st = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1000000
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const uploadFile = multer({ storage: st }).single("poster");

router.get("/add", cc.addPage);
router.get("/", cc.viewPage);
router.post("/upload", uploadFile, cc.upload);
router.get("/edit", cc.edit);
router.post("/edit", uploadFile, cc.update);
router.get("/remove", cc.remove);

module.exports = router;
