import db from '../config/db.mjs';

// Function to get general view data
const getVistaGeneral = async () => {
    const sql = "SELECT * FROM vistageneral";
    const [results] = await db.query(sql);
    return results;
};

// Function to get all vehicles
const getVehicles = async () => {
    const sql = "SELECT * FROM vehiculo";
    const [results] = await db.query(sql);
    return results;
};

// Function to get a vehicle by its plate number
const getVehicleByPlate = async (matriculaParam) => {
    const sql = "SELECT * FROM vehiculo WHERE matriculaCar=?";
    const [results] = await db.query(sql, matriculaParam);
    return results;
};

// Function to add a new vehicle
const addVehicle = async (matriculaCar, fabricante, modelo, motorizacion, antiguedad, descripcion, tipoVehiculo, precioDia) => {
    const sqlInsert = "INSERT INTO vehiculo (matriculaCar, fabricante, modelo, motorizacion, antigüedad, alquilado, enmantenimiento, descripcion, tipoVehiculo, precioDia) VALUES (?, ?, ?, ?, ?, 0, 0, ?, ?, ?)";
    await db.query(sqlInsert, [matriculaCar, fabricante, modelo, motorizacion, antiguedad, descripcion, tipoVehiculo, precioDia]);

    const sqlSelect = "SELECT * FROM vehiculo WHERE matriculaCar = ?";
    const [results] = await db.query(sqlSelect, [matriculaCar]);

    if (results.length === 0) {
        throw new Error('Vehicle not found after insertion');
    }

    const newVehicle = results[0];
    updateVistaGeneral(matriculaCar, modelo);
    return newVehicle;
};

// Function to edit a vehicle
const editVehicle = async (fabricante, modelo, motorizacion, antiguedad, descripcion, tipoVehiculo, precioDia, matricula) => {
    const sql = "UPDATE vehiculo SET fabricante=?, modelo=?, motorizacion=?, antigüedad=?, descripcion=?, tipoVehiculo=?, precioDia=? WHERE matriculaCar=?";
    const [results] = await db.query(sql, [fabricante, modelo, motorizacion, antiguedad, descripcion, tipoVehiculo, precioDia, matricula]);
    editVistaGeneral(modelo, matricula);
    return results;
};

// Function to delete a vehicle
const deleteVehicle = async (matricula) => {
    const sql = "DELETE FROM vehiculo WHERE matriculaCar=?";
    const [results] = await db.query(sql, [matricula]);
    db.query("DELETE FROM vistageneral WHERE matricula=?", [matricula]);
    return results;
};

// Function to update general view data
const updateVistaGeneral = async (matricula, modelo) => {
    const sql = "INSERT INTO vistageneral (matricula, modelo, alquilado, enmantenimiento, dniinquilino) VALUES(?, ?, 0, 0, '')";
    await db.query(sql, [matricula, modelo]);
};

// Function to edit general view data
const editVistaGeneral = async (modelo, matricula) => {
    const sql = "UPDATE vistageneral SET modelo=? WHERE matricula=?";
    await db.query(sql, [modelo, matricula]);
};

// Function to get all clients
const getClients = async () => {
    const sql = "SELECT dni, nombre, apellidos, email, saldo, inicioAlquiler, finAlquiler, matriculaAlq FROM cliente";
    const [results] = await db.query(sql);
    return results;
};

// Function to get a client by their DNI
const getClientByDNI = async (dni) => {
    const sql = "SELECT dni, nombre, apellidos, email, saldo, inicioAlquiler, finAlquiler, matriculaAlq FROM cliente WHERE DNI=?";
    const [results] = await db.query(sql, dni);
    return results;
};

// Function to add a new client
const addClient = async (dni, nombre, apellidos, email, password) => {
    const sql = "INSERT INTO cliente VALUES(?, ?, ?, ?, ?, 0, null, null, '')";
    const [results] = await db.query(sql, [dni, nombre, apellidos, email, password]);
    return results;
};

// Function to edit a client
const editClient = async (dni, nombre, apellidos, email) => {
    const sql = "UPDATE cliente SET nombre=?, apellidos=?, email=? WHERE DNI=?";
    const [results] = await db.query(sql, [nombre, apellidos, email, dni]);
    return results;
};

// Function to update a client's balance
const updateBalance = async (dni, Saldo) => {
    const sql = "UPDATE cliente SET Saldo=Saldo+? WHERE DNI=?";
    const [results] = await db.query(sql, [Saldo, dni]);
    return results;
};

// Function to rent a vehicle
const rentVehicle = async (dni, InicioAlquiler, FinAlquiler, matricula) => {
    try {
        await db.query("UPDATE cliente SET InicioAlquiler=?, FinAlquiler=?, MatriculaAlq=? WHERE DNI=?", [InicioAlquiler, FinAlquiler, matricula, dni]);
        await db.query("UPDATE vehiculo SET Alquilado=1 WHERE matriculaCar=?", [matricula]);
        await db.query("UPDATE vistageneral SET Alquilado=1, DNIInquilino=? WHERE matricula=?", [dni, matricula]);
        return { success: true, message: 'Vehicle rented successfully.' };
    } catch (error) {
        console.error("Error renting the vehicle:", error);
        throw error;
    }
};

// Function to cancel a vehicle rental
const cancelRent = async (dni, matricula) => {
    try {
        await db.query("UPDATE cliente SET InicioAlquiler=null, FinAlquiler=null, MatriculaAlq=null WHERE DNI=?", [dni]);
        await db.query("UPDATE vehiculo SET Alquilado=0 WHERE matriculaCar=?", [matricula]);
        await db.query("UPDATE vistageneral SET Alquilado=0, DNIInquilino=null WHERE matricula=?", [matricula]);
        return { success: true, message: 'Vehicle rental cancelled successfully.' };
    } catch (error) {
        console.error("Error cancelling the vehicle rental:", error);
        throw error;
    }
};

// Function to delete a client
const deleteClient = async (dni) => {
    const sql = "DELETE FROM cliente WHERE dni=?";
    const [results] = await db.query(sql, [dni]);
    return results;
};

// Function to get maintenance information for a vehicle
const getMaintenance = async (matricula) => {
    const sql = "SELECT * FROM mantenimiento WHERE matriculaMant=?";
    const [results] = await db.query(sql, [matricula]);
    return results;
};

// Function to add maintenance information for a vehicle
const addMaintenance = async (matricula, modelo, tipo, estado) => {
    const sql = "INSERT INTO mantenimiento VALUES(?, ?, ?, ?)";
    const [results] = await db.query(sql, [matricula, modelo, tipo, estado]);
    setMaintenance(1, matricula);
    return results;
};

// Function to delete maintenance information for a vehicle
const deleteMaintenance = async (matricula) => {
    const sql = "DELETE FROM mantenimiento WHERE matriculaMant=?";
    const [results] = await db.query(sql, [matricula]);
    setMaintenance(0, matricula);
    return results;
};

// Function to set maintenance status for a vehicle
const setMaintenance = async (mantenimiento, matricula) => {
    db.query("UPDATE vehiculo SET enmantenimiento=? WHERE matriculacar=?", [mantenimiento, matricula]);
    db.query("UPDATE vistageneral SET enmantenimiento=? WHERE matricula=?", [mantenimiento, matricula]);
};

export default {
    getVistaGeneral,
    getVehicles,
    getVehicleByPlate,
    addVehicle,
    editVehicle,
    deleteVehicle,
    getClients,
    getClientByDNI,
    addClient,
    editClient,
    updateBalance,
    rentVehicle,
    cancelRent,
    deleteClient,
    getMaintenance,
    addMaintenance,
    deleteMaintenance
};
