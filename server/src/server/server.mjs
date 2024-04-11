import express from "express";
import { createServer } from 'http';

import path from 'path';
import cors from 'cors';
import helmet from 'helmet';

import rentRouter from "../routers/rent.router.mjs"

import  { SERVER_PORT } from '../config/config.mjs';

const app = express();

app.disable('x-powered-by');

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/api/v1', (req, res) => {
    return res.send({
        error: false,
        message: 'Bienvenido a la api de alquiler de coches Tenerife',
        written_by: 'Joel Munuera Marrero',
        published_on: 'https://rentacartf.es'
    });
});

app.use('/api/v1', rentRouter)

const server = createServer(app);

const runServer = () => {
    console.log('Servidor arrancado...');
    server.listen(SERVER_PORT, () => {
        console.log(
            `Puerto: http://localhost:${server.address().port}`
        );
        console.log("Para cerrar el servidor pulse Control+C, y escriba la letra 'S'");
    });
};

const stopServer = () => {
    console.log('Cerrando el servidor...');
    server.close();
};

export  { runServer, stopServer };