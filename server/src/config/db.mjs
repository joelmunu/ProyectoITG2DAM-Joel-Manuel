// Importing the createPool function from the 'mysql2/promise' library
import { createPool } from 'mysql2/promise'

// Importing the configuration from the 'config.mjs' file
import * as config from './config.mjs'

// Creating a connection pool using the createPool function with the configuration parameters
const pool = createPool({
    host: config.DB_HOST,          // Database host address
    user: config.DB_USER,          // Database username
    password: config.DB_PASSWORD,  // Database password
    database: config.DB_DATABASE,  // Database name
    waitForConnections: true,      // Whether the pool should wait for connections to become available
    connectionLimit: 10,           // Maximum number of connections in the pool
    queueLimit: 0,                 // Maximum number of connection requests the pool can queue
    charset: 'utf8'                // Character set for the connection
});

// Exporting the created pool
export default pool;
