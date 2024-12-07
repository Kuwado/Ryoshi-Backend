const {
  createNewPrice,
  updatePrice,
  deletePrice,
} = require("../queries/locationPriceQuery");

const insertPrice = async (req, res) => {
  try {
    const price = await createNewPrice(req.body);
    res.status(200).json({
      message: "Add price type to location succcessfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateNewPrice = async (req, res) => {
  try {
    const count = await updatePrice(req.params.id, req.body);
    if (count == 0) {
      return res.status(200).json({
        message: "Price no change",
      });
    }
    res.status(200).json({
      message: "Price updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deletePriceInLocation = async (req, res) => {
  try {
    const [count] = await deletePrice(req.params.id);
    if (count == 0) {
      return res.status(400).json({
        message: "Price not found",
      });
    }
    res.status(200).json({
      message: "Price deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { insertPrice, updateNewPrice, deletePriceInLocation };
