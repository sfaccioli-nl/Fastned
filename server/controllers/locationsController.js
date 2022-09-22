import Location from '../models/Location.js';

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    return res.json(locations);
  } catch (error) {
    console.log(error);
  }
};

const getLocationById = async (req, res) => {
  try {
    const locationById = await Location.findById(req.params.id).populate('chargers');
    if (!locationById) return res.status(404).send('The location with the given ID was not found.');

    return res.json(locationById);
  } catch (error) {
    console.log(error);
  }
};

const createLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    const storedLocation = await location.save();
    return res.json(storedLocation);
  } catch (error) {
    console.log(error);
  }
};

const updateLocation = async (req, res) => {
  try {
    const locationById = await Location.findById(req.params.id);
    if (!locationById) return res.status(404).send('The location with the given ID was not found.');

    const { name, location, city, postalCode, country } = req.body;
    const locationToUpdate = await Location.findByIdAndUpdate(
      req.params.id,
      {
        name: name || locationById.name,
        location: location || locationById.location,
        city: city || locationById.city,
        postalCode: postalCode || locationById.postalCode,
        country: country || locationById.country,
      },
      {
        new: true,
      }
    ).populate('chargers');

    const storedLocation = await locationToUpdate.save();
    return res.json(storedLocation);
  } catch (error) {
    console.log(error);
  }
};

export { getLocations, getLocationById, createLocation, updateLocation };
