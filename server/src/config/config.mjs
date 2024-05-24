// Importing the config function from the "dotenv" library
import { config } from "dotenv";

// Calling the config function to load environment variables from a .env file into process.env
config();

// Setting up default values for environment variables if they are not defined
export const NODE_ENV = process.env.NODE_ENV || "development";       // Default: "development"
export const DB_HOST = process.env.DB_HOST || "localhost";           // Default: "localhost"
export const DB_PORT = parseInt(process.env.DB_PORT || "3306", 10);  // Default: 3306
export const DB_USER = process.env.DB_USER || "root";                // Default: "root"
export const DB_PASSWORD = process.env.DB_PASSWORD || "1234567890";  // Default: "1234567890"
export const DB_DATABASE = process.env.DB_DATABASE || "rentacartf";  // Default: "rentacartf"
export const SERVER_PORT = parseInt(process.env.SERVER_PORT || "8000", 10);  // Default: 8000
