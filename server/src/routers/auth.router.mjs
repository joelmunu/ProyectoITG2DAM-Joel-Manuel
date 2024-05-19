// auth.router.mjs

import express from "express";
import bcrypt from 'bcrypt';
import pool from '../config/db.mjs';

const router = express.Router();

// Registro de cliente
router.post('/register', async (req, res) => {
    const { dni, nombre, apellidos, email, password } = req.body;

    if (!dni || !nombre || !apellidos || !email || !password) {
        return res.status(400).json({ message: 'Se requieren todos los campos' });
    }

    try {
        const [existingUsers, fields] = await pool.query('SELECT * FROM cliente WHERE email = ?', [email]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query('INSERT INTO cliente (dni, nombre, apellidos, email, password) VALUES (?, ?, ?, ?, ?)', [dni, nombre, apellidos, email, hashedPassword]);

        return res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario: ', error);
        return res.status(500).json({ message: 'Error del servidor' });
    }
});

// Inicio de sesión cliente
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Se requiere email y contraseña' });
    }

    try {
        const [rows, fields] = await pool.query('SELECT * FROM cliente WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }

        const user = rows[0];

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error('Error al comparar contraseñas: ', err);
                return res.status(500).json({ message: 'Error del servidor' });
            }

            if (result) {
                return res.status(200).json({ message: 'Inicio de sesión exitoso' });
            } else {
                return res.status(401).json({ message: 'Email o contraseña incorrectos' });
            }
        });
    } catch (error) {
        console.error('Error al ejecutar la consulta: ', error);
        return res.status(500).json({ message: 'Error del servidor' });
    }
});

// Inicio de sesión Administrador
router.post('/adminlogin', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Se requiere nombre de usuario y contraseña' });
    }

    try {
        const [rows, fields] = await pool.query('SELECT * FROM admin WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
        }

        const user = rows[0];

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error('Error al comparar contraseñas: ', err);
                return res.status(500).json({ message: 'Error del servidor' });
            }

            if (result) {
                return res.status(200).json({ message: 'Inicio de sesión exitoso' });
            } else {
                return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
            }
        });
    } catch (error) {
        console.error('Error al ejecutar la consulta: ', error);
        return res.status(500).json({ message: 'Error del servidor' });
    }
});

export default router;
