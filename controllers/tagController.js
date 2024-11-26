const { getAllTags } = require("../queries/tagQuery");

const getTags = async (req, res) => {
  try {
    const tags = await getAllTags();
    res.status(200).json({
      message: "Get all tags",
      tags: tags,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTags };
