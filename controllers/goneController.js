const { insertGone, deleteGone } = require("../queries/goneQuery");

const insertLocationToGone = async (req, res) => {
  try {
    const gone = await insertGone(req.body);
    res.status(200).json({
      message: "行った場所リストに追加しました。",
      gone: gone,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const destroyAGone = async (req, res) => {
  try {
    const count = await deleteGone(req.params.id);
    if (count === 0) {
      return res.status(400).json({
        message: "場所が見つかりませんでした。",
      });
    }
    res.status(200).json({
      message: "行った場所リストから削除しました。",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { destroyAGone, insertLocationToGone };
