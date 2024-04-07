import { runServer, stopServer } from './server/server.mjs';

const startApplication = () => {
    runServer();
};
startApplication();

const stopApplication = () => {
    console.log('\nSeñal de cierre recibida, cerrando la conexión...');
    stopServer();
    process.exit(0);
};


process.on('SIGINT', () => stopApplication());
process.on('SIGTERM', () => stopApplication());