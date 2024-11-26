const express = require("express");
const route = express.Router();
const { getTags } = require("../controllers/tagController");

route.get("/", getTags);

module.exports = route;
