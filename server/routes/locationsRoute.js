import express from 'express';
import { getLocations, getLocationById, createLocation, updateLocation } from '../controllers/locationsController.js';

const locationsRouter = express.Router();

locationsRouter.get('/', getLocations);

locationsRouter.get('/:id', getLocationById);

locationsRouter.post('/', createLocation);

locationsRouter.patch('/:id', updateLocation);

export default locationsRouter;
