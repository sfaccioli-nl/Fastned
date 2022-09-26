import Country from '../models/Country.js';

const getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    return res.json(countries);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const getCountryById = async (req, res) => {
  try {
    const countryById = await Country.findById(req.params.id);
    if (!countryById) return res.status(404).send('The country with the given ID was not found.');

    return res.json(countryById);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const createCountry = async (req, res) => {
  const { code } = req.body;
  const countryExists = await Country.findOne({ code });

  if (countryExists) {
    const error = new Error('The country with the given code already exists');
    return res.status(400).json({ msg: error.message });
  }

  try {
    const country = new Country(req.body);
    const storedCountry = await country.save();


    return res.json(storedCountry);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const updateCountry = async (req, res) => {
  try {
    const countryById = await Country.findById(req.params.id);
    if (!countryById) return res.status(404).send('The country with the given ID was not found.');

    const { name, code } = req.body;
    const countryToUpdate = await Country.findByIdAndUpdate(
      req.params.id,
      {
        name: name || countryById.name,
        code: code || countryById.code
      },
      {
        new: true,
      }
    );

    const storedCountry = await countryToUpdate.save();

    return res.json(storedCountry);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const countryById = await Country.findById(req.params.id);
    if (!countryById) {
      const error = new Error('The country with the given ID was not found');
      return res.status(404).json({ msg: error.message });
    }


    const countryToUpdate = await Country.findByIdAndUpdate(
      req.params.id,
      {
        deleted: 1,
      },
      {
        new: true,
      }
    );


    await countryToUpdate.save();

    return res.status(200).json({ msg: 'Country successfully deleted' });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export { getCountries, getCountryById, createCountry, updateCountry, deleteCountry };
