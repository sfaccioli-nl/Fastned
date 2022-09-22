import express from 'express';
import { getChargers, getChargerById, createCharger, updateCharger, deleteCharger } from '../controllers/chargersController.js';

const chargersRouter = express.Router();

chargersRouter.get('/', getChargers);

chargersRouter.get('/:id', getChargerById);

chargersRouter.post('/', createCharger);

chargersRouter.patch('/:id', updateCharger);

chargersRouter.delete('/:id', deleteCharger);

export default chargersRouter;
