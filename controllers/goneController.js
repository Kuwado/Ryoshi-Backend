const { insertGone, deleteGone } = require("../queries/goneQuery");

const insertLocationToGone = async (req, res) => {
  try {
    const gone = await insertGone(req.body);
    res.status(200).json({
      message: "Add location to the gone list",
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
        message: "Location not found",
      });
    }
    res.status(200).json({
      message: "Remove location from gone list",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { destroyAGone, insertLocationToGone };
