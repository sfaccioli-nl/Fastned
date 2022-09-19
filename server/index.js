import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import * as dotenv from 'dotenv';
import locationsRouter from './routes/locationsRoute.js';

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

connectDB();

//Routing
app.use('/api/locations', locationsRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));