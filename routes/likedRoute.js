const express = require("express");
const route = express.Router();
const { createALike, removeLike } = require("../controllers/likedController");

route.post("/", createALike);
route.delete("/:id", removeLike);

module.exports = route;
