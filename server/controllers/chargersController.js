import Charger from '../models/Charger.js';
import Location from '../models/Location.js';

const getChargers = async (req, res) => {
  try {
    const chargers = await Charger.find();
    return res.json(chargers);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const getChargerById = async (req, res) => {
  try {
    const chargerById = await Charger.findById(req.params.id);
    if (!chargerById) return res.status(404).send('The charger with the given ID was not found.');

    return res.json(chargerById);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const createCharger = async (req, res) => {
  const { serialNumber } = req.body;
  const chargerExists = await Charger.findOne({ serialNumber });

  if (chargerExists) {
    const error = new Error('The charger with the given serial number already exists');
    return res.status(200).json({ msg: error.message });
  }

  try {
    const charger = new Charger(req.body);
    const storedCharger = await charger.save();

    if (req.body.location) {
      const locationById = await Location.findById(req.body.location);
      if (!locationById) return res.status(404).send('The location with the given ID was not found.');

      const locationToUpdate = await Location.findByIdAndUpdate(
        req.body.location,
        {
          chargers: [...locationById.chargers, storedCharger._id],
        },
        {
          new: true,
        }
      );

      await locationToUpdate.save();
    }

    return res.json(storedCharger);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const updateCharger = async (req, res) => {
  try {
    const chargerById = await Charger.findById(req.params.id);
    if (!chargerById) return res.status(404).send('The charger with the given ID was not found.');

    const { type, serialNumber, status, location } = req.body;
    const chargerToUpdate = await Charger.findByIdAndUpdate(
      req.params.id,
      {
        type: type || chargerById.type,
        serialNumber: serialNumber || chargerById.serialNumber,
        status: status || chargerById.status,
        location: location || chargerById.location
      },
      {
        new: true,
      }
    );

    const storedCharger = await chargerToUpdate.save();

    return res.json(storedCharger);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const deleteCharger = async (req, res) => {
  try {
    const chargerById = await Charger.findById(req.params.id);
    if (!chargerById) {
      const error = new Error('The charger with the given ID was not found');
      return res.status(404).json({ msg: error.message });
    }

    const locationById = await Location.findById(chargerById.location);
    console.log(chargerById.location);
    if (!locationById) {
      const error = new Error('The location with the given ID was not found');
      return res.status(404).json({ msg: error.message });
    }

    const chargerToUpdate = await Charger.findByIdAndUpdate(
      req.params.id,
      {
        deleted: 1,
      },
      {
        new: true,
      }
    );

    const newChargers = locationById.chargers.filter(charger => charger.toString() !== req.params.id);

    const locationToUpdate = await Location.findByIdAndUpdate(chargerToUpdate.location, {
      chargers: newChargers,
    });

    await locationToUpdate.save();
    await chargerToUpdate.save();

    return res.status(200).json({ msg: 'Charger successfully deleted' });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export { getChargers, getChargerById, createCharger, updateCharger, deleteCharger };
