const { insertLike, deleteLike } = require("../queries/likedQuery");

const createALike = async (req, res) => {
  try {
    const like = await insertLike(req.body);
    res.status(200).json({
      message: "お気に入りに追加しました。",
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
        message: "お気に入りから削除しました。",
      });
    } else {
      res.status(404).json({
        message: "お気に入りが見つかりませんでした。",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createALike, removeLike };
