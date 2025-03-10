import "dotenv/config"
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import usersRoutes from "./adapter/routes/user.routes.js";

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Servir archivos estáticos
app.use(express.static('public'));

app.use(usersRoutes);

export default app;
