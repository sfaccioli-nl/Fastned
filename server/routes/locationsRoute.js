import express from 'express';
import { getLocations, createLocation } from '../controllers/locationsController.js';

const locationsRouter = express.Router();

locationsRouter.get('/', getLocations);

locationsRouter.post('/', createLocation);

locationsRouter.put('/', (req,res) => {
  res.send('desde put api/locations')
});

export default locationsRouter;