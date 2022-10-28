import express from 'express';
import { getCountries, getCountryById, createCountry, updateCountry, deleteCountry } from '../controllers/countriesController.js';

const countriesRouter = express.Router();

countriesRouter.get('/', getCountries);

countriesRouter.get('/:id', getCountryById);

countriesRouter.post('/', createCountry);

countriesRouter.patch('/:id', updateCountry);

countriesRouter.delete('/:id', deleteCountry);

export default countriesRouter;
