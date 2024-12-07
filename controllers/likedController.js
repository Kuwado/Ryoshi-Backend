const { insertLike, deleteLike } = require("../queries/likedQuery");

const createALike = async (req, res) => {
  try {
    const like = await insertLike(req.body);
    res.status(200).json({
      message: "LAdd to liked location",
      like: like,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeLike = async (req, res) => {
  try {
    const count = await deleteLike(req.params.id);
    if (count > 0) {
      res.status(200).json({
        message: "Removed from liked location",
      });
    } else {
      res.status(404).json({
        message: "Not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createALike, removeLike };
