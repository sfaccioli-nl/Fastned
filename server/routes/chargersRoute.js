import express from 'express';
import { getChargers, createCharger, updateCharger } from '../controllers/chargersController.js';

const chargersRouter = express.Router();

chargersRouter.get('/', getChargers);

chargersRouter.post('/', createCharger);

chargersRouter.patch('/:id', updateCharger);

export default chargersRouter;