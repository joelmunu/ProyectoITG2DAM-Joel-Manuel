import { runServer, stopServer } from './server/server.mjs';

// Function to start the application
const startApplication = () => {
    runServer();
};
startApplication();

// Function to stop the application
const stopApplication = () => {
    console.log('\nSeñal de cierre recibida, cerrando la conexión...');
    stopServer();
    process.exit(0);
};

// Event listener for SIGINT (Ctrl+C)
process.on('SIGINT', () => stopApplication());

// Event listener for SIGTERM
process.on('SIGTERM', () => stopApplication());