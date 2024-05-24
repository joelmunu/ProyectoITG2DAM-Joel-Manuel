import express from "express";
import { createServer } from 'http';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import rentRouter from "../routers/rent.router.mjs";
import authRouter from "../routers/auth.router.mjs";

import { SERVER_PORT } from '../config/config.mjs';

// Initialize Express application
const app = express();

// Disable x-powered-by header
app.disable('x-powered-by');

// Enhance security with Helmet middleware
app.use(helmet());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({extended: true}));

// Enable CORS
app.use(cors());

// Serve static files from 'public' directory
app.use(express.static(path.join(process.cwd(), 'public')));

// API root endpoint
app.get('/api/v1', (req, res) => {
    return res.send({
        error: false,
        message: 'Bienvenido a la api de alquiler de coches Tenerife',
        written_by: 'Joel Munuera Marrero',
        published_on: 'https://rentacartf.es'
    });
});

// Route middleware for car rental endpoints
app.use('/api/v1', rentRouter);
// Route middleware for authentication endpoints
app.use('/api/v1/auth', authRouter);


const server = createServer(app);

// Function to start the server
const runServer = () => {
    console.log('Servidor arrancado...');
    server.listen(SERVER_PORT, () => {
        console.log(
            `Puerto: http://localhost:${server.address().port}`
        );
        console.log("Para cerrar el servidor pulse Control+C, y escriba la letra 'S'");
    });
};

// Function to stop the server
const stopServer = () => {
    console.log('Cerrando el servidor...');
    server.close();
};

// Export server start and stop functions
export { runServer, stopServer };