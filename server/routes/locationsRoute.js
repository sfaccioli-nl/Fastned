import express from 'express';
import { getLocations, createLocation, updateLocation } from '../controllers/locationsController.js';

const locationsRouter = express.Router();

locationsRouter.get('/', getLocations);

locationsRouter.post('/', createLocation);

locationsRouter.patch('/:id', updateLocation);


export default locationsRouter;