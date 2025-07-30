import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import projectRoutes from "./routes/ProjectRoutes";
import { corsConfig } from './config/cors';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();
connectDatabase(); 
const app = express();
app.use(morgan('dev'));
// Cors Solution error
app.use(cors(corsConfig));
// Read .json
app.use(express.json());
// Routes
app.use('/api/projects', projectRoutes);

export default app;
