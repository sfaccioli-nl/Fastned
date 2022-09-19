import Location from '../models/Location.js';

const getLocations = async (req,res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    console.log(error);
  }
};

const createLocation = async (req,res) => {
  try {
    const location = new Location(req.body);
    const storedLocation = await location.save();
    res.json(storedLocation);
  } catch (error) {
    console.log(error);
  }
};

export {getLocations, createLocation};