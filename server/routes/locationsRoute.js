import express from 'express';
import { getLocations, getLocationById, createLocation, updateLocation, deleteLocation } from '../controllers/locationsController.js';

const locationsRouter = express.Router();

locationsRouter.get('/', getLocations);

locationsRouter.get('/:id', getLocationById);

locationsRouter.post('/', createLocation);

locationsRouter.patch('/:id', updateLocation);

locationsRouter.delete('/:id', deleteLocation);

export default locationsRouter;
