const {
  getLocations,
  getALocation,
  updateLocation,
  createLocation,
  deleteLocation,
} = require("../queries/locationQuery");

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

const insertLocation = async (req, res) => {
  try {
    const locationData = {
      ...req.body,
      images:
        req.files && req.files.length >= 1
          ? req.files.map((file) => `${file.filename}`)
          : null,
    };
    const location = await createLocation(locationData);
    res.status(200).json({
      message: "Add location successfully",
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
    const locationData = {
      ...req.body,
      images:
        req.files && req.files.length >= 1
          ? req.files.map((file) => `${file.filename}`)
          : null,
    };
    const count = updateLocation(req.params.id, locationData);
    if (count == 0) {
      return res.status(200).json({
        message: "Location not changed",
      });
    }
    res.status(200).json({
      message: "Location updated successfully",
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
        message: "Can not delete location",
      });
    }
    res.status(200).json({
      message: "Location deleted successfully",
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
};
