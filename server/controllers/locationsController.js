import Location from '../models/Location.js';
import Charger from '../models/Charger.js';

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({ deleted: 0 });
    return res.json(locations);
  } catch (error) {
    console.log(error);
  }
};

const getLocationById = async (req, res) => {
  try {
    const locationById = await Location.findById(req.params.id).populate('chargers');
    if (!locationById) {
      const error = new Error('The location with the given ID was not found');
      return res.status(404).json({ msg: error.message });
    }

    if (locationById.deleted) {
      const error = new Error('The location no longer exists');
      return res.status(404).json({ msg: error.message });
    }

    return res.json(locationById);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const createLocation = async (req, res) => {
  const {location} = req.body;
  const locationExists = await Location.findOne({location});

  if (locationExists) {
    const error = new Error('The location with the given location nro already exists');
      return res.status(200).json({ msg: error.message });
  }

  try {
    const location = new Location(req.body);
    const storedLocation = await location.save();
    return res.json(storedLocation);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const updateLocation = async (req, res) => {
  try {
    const locationById = await Location.findById(req.params.id);
    if (!locationById) {
      const error = new Error('The location with the given ID was not found');
      return res.status(404).json({ msg: error.message });
    }

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
    return res.status(400).json({ msg: error.message });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const locationById = await Location.findById(req.params.id);
    if (!locationById) {
      const error = new Error('The location with the given ID was not found');
      return res.status(404).json({ msg: error.message });
    }
    const locationToUpdate = await Location.findByIdAndUpdate(
      req.params.id,
      {
        deleted: 1,
      },
      {
        new: true,
      }
    );

    locationToUpdate.chargers.forEach(async charger => {
      const chargerToUpdate = await Charger.findByIdAndUpdate(charger._id, {
        location: null,
      });

      await chargerToUpdate.save();
    });

    await locationToUpdate.save();
    return res.status(200).json({ msg: 'Location successfully deleted' });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export { getLocations, getLocationById, createLocation, updateLocation, deleteLocation };
