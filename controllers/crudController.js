const user = require("../models/crudModel");
const form = (req, res) => {
  res.render("form");
};

const table = (req, res) => {
  res.render("table");
};
module.exports = {
  form,
};
