import "dotenv/config"
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import usersRoutes from "./adapter/routes/user.routes.js";
import authRouters from "./adapter/routes/auth.routes.js";
import pointRouters from "./adapter/routes/point.routes.js";
import { container, scopePerRequest } from './infrastructure/container/container.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Servir archivos estáticos
app.use(express.static('public'));

app.use(scopePerRequest(container));

app.use(usersRoutes);

app.use(authRouters);

app.use(pointRouters);

export default app;
