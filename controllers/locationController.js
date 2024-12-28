const {
  getLocations,
  getALocation,
  updateLocation,
  createLocation,
  deleteLocation,
} = require("../queries/locationQuery");
const { getUser } = require("../queries/userQuery");
const getDistance = require("../utils/distanceMiddleware");

const getListLocations = async (req, res) => {
  try {
    const locations = await getLocations();
    res.status(200).json({
      message: "Get list of locations",
      location: locations,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLocationDetail = async (req, res) => {
  try {
    const location = await getALocation(req.params.id);
    res.status(200).json({
      message: "Get location detail",
      location: location,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLocationDetailWithUser = async (req, res) => {
  try {
    const location = await getALocation(req.params.id);
    const user = await getUser(req.body.user_id);
    const distance = await getDistance(location.address, user.address);
    res.status(200).json({
      message: "Get location detail with user (distance)",
      location: location,
      distance: distance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const insertLocation = async (req, res) => {
  try {
    console.log("Check files: ", req.files);
    const locationData = {
      ...req.body,
      images:
        req.files.images && req.files.images.length >= 1
          ? req.files.images.map((file) => file.filename).join(",")
          : null,
      avatar: req.files.avatar ? req.files.avatar[0].filename : null,
    };
    const location = await createLocation(locationData);
    res.status(200).json({
      message: "ロケーションが正常に追加されました。",
      location: location,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateLocationDetail = async (req, res) => {
  try {
    let locationData = {};
    if (req.files) {
      locationData = {
        ...req.body,
        images:
          req.files.images && req.files.images.length >= 1
            ? req.files.images.map((file) => file.filename).join(",")
            : null,
        avatar: req.files.avatar ? req.files.avatar[0].filename : null,
      };
    } else locationData = req.body;
    const count = await updateLocation(req.params.id, locationData);
    if (count == 0) {
      return res.status(200).json({
        message: "Location not changed",
      });
    }
    res.status(200).json({
      message: "ロケーションが正常に更新されました。",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteALocation = async (req, res) => {
  try {
    const count = await deleteLocation(req.params.id);
    if (count == 0) {
      return res.status(400).json({
        message: "Can not delete location, location not found",
      });
    }
    res.status(200).json({
      message: "ロケーションが正常に削除されました。",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getListLocations,
  getLocationDetail,
  insertLocation,
  deleteALocation,
  updateLocationDetail,
  getLocationDetailWithUser,
};
