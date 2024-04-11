import { config } from 'dotenv';

config();
export const NODE_ENV =  process.env.NODE_ENV || 'development'
export const DB_HOST = process.env.DB_HOST || '192.168.0.21'
export const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10)
export const DB_USER = process.env.DB_USER || 'ext'
export const DB_PASSWORD = process.env.DB_PASSWORD || '1234'
export const DB_DATABASE = process.env.DB_DATABASE || 'rentacartf'

export const SERVER_PORT = parseInt(process.env.SERVER_PORT || '8000', 10);