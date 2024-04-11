import db from '../config/db.mjs';

const getVistaGeneral = async () => {
    const sql = "SELECT * FROM vistageneral"
    const [results] = await db.query(sql);

    return results;
}

const getVehicles = async () => {
    const sql = "SELECT * FROM vehiculo";
    const [results] = await db.query(sql);

    return results;
}

const getVehicleByPlate = async (matriculaParam) => {
    const sql = "SELECT * FROM vehiculo WHERE matriculaCar=?";
    const [results] = await db.query(sql, matriculaParam);
    return results;
}

const addVehicle = async (matriculaCar, fabricante, modelo, motorizacion, antiguedad, descripcion, tipoVehiculo, precioDia) => {
    const sql = "INSERT INTO vehiculo (matriculaCar, fabricante, modelo, motorizacion, antigüedad, alquilado, enmantenimiento, descripcion, tipoVehiculo, precioDia) VALUES (?, ?, ?, ?, ?, 0, 0, ?, ?, ?)"
    const [results] = await db.query(sql, [matriculaCar, fabricante, modelo, motorizacion, antiguedad, descripcion, tipoVehiculo, precioDia]);
    updateVistaGeneral(matriculaCar, modelo);
    return results;
}

const editVehicle = async (fabricante, modelo, motorizacion, antiguedad, descripcion, tipoVehiculo, precioDia, matricula) => {
    const sql = "UPDATE vehiculo SET fabricante=?, modelo=?, motorizacion=?, antigüedad=?, descripcion=?, tipoVehiculo=?, precioDia=? WHERE matriculaCar=?";
    const [results] = await db.query(sql, [fabricante, modelo, motorizacion, antiguedad, descripcion, tipoVehiculo, precioDia, matricula]);
    editVistaGeneral(modelo, matricula);
    return results;
}

const deleteVehicle = async (matricula) => {
    const sql = "DELETE FROM vehiculo WHERE matriculaCar=?";
    const [results] = await db.query(sql, [matricula]);
    db.query("DELETE FROM vistageneral WHERE matricula=?", [matricula]);
    return results;
}

const updateVistaGeneral = async (matricula, modelo) => {
    const sql = "INSERT INTO vistageneral (matricula, modelo, alquilado, enmantenimiento, dniinquilino) VALUES(?, ?, 0, 0, '');";
    await db.query(sql, [matricula, modelo]);
}

const editVistaGeneral = async (modelo, matricula) => {
    const sql = "UPDATE vistageneral SET modelo=? WHERE matricula=?";
    await db.query(sql, [modelo, matricula]);
}

export default {
    getVistaGeneral,
    getVehicles,
    getVehicleByPlate,
    addVehicle,
    editVehicle,
    deleteVehicle
}