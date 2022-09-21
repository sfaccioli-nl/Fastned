import Charger from '../models/Charger.js';

const getChargers = async (req, res) => {
  try {
    const chargers = await Charger.find();
    return res.json(chargers);
  } catch (error) {
    console.log(error);
  }
};

const createCharger = async (req, res) => {
  try {
    const charger = new Charger(req.body);
    const storedCharger = await charger.save();
    return res.json(storedCharger);
  } catch (error) {
    console.log(error);
  }
};

const updateCharger = async (req, res) => {
  try {
    const chargerById = await Charger.findById(req.params.id);
    if (!chargerById) return res.status(404).send('The charger with the given ID was not found.');

    const { type, serialNumber, status, location } = req.body;
    console.log(req.body);
    const chargerToUpdate = await Charger.findByIdAndUpdate(
      req.params.id,
      {
        type: type || chargerById.type,
        serialNumber: serialNumber || chargerById.serialNumber,
        status: status || chargerById.status,
        location: location || chargerById.location,
      },
      {
        new: true,
      }
    );

    const storedCharger = await chargerToUpdate.save();
    return res.json(storedCharger);
  } catch (error) {
    console.log(error);
  }
};

export { getChargers, createCharger, updateCharger };
