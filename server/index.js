import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import * as dotenv from 'dotenv';
import locationsRouter from './routes/locationsRoute.js';
import chargersRouter from './routes/chargersRoute.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ type: 'application/*+json' }));

dotenv.config();

connectDB();

//Routing
app.use('/api/locations', locationsRouter);
app.use('/api/chargers', chargersRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
