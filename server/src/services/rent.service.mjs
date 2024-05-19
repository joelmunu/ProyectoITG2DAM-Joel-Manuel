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

const getClients = async () => {
    const sql = "SELECT * FROM cliente"
    const [results] = await db.query(sql);

    return results;
}

const getClientByDNI = async (dni) => {
    const sql = "SELECT * FROM cliente WHERE DNI=?"
    const [results] = await db.query(sql, dni);

    return results;
}

const addClient = async (dni, nombre, apellidos, email, password) => {
    const sql = "INSERT INTO cliente VALUES(?, ?, ?, ?, ?, 0, null, null, '')";
    const [results] = await db.query(sql, [dni, nombre, apellidos, email, password]);

    return results;
}

const editClient = async (dni, nombre, apellidos, email) => {
    const sql = "UPDATE cliente SET nombre=?, apellidos=?, email=? WHERE DNI=?";
    const [results] = await db.query(sql, [nombre, apellidos, email, dni]);

    return results;
}

const updateBalance = async (dni, Saldo) => {
    const sql = "UPDATE cliente SET Saldo=Saldo+? WHERE DNI=?";
    const [results] = await db.query(sql, [Saldo, dni]);

    return results;
}

const rentVehicle = async (dni, InicioAlquiler, FinAlquiler, matricula) => {
    try {
        await db.query("UPDATE cliente SET InicioAlquiler=?, FinAlquiler=?, MatriculaAlq=? WHERE DNI=?", [InicioAlquiler, FinAlquiler, matricula, dni]);
        await db.query("UPDATE vehiculo SET Alquilado=1 WHERE matriculaCar=?", [matricula]);
        await db.query("UPDATE vistageneral SET Alquilado=1, DNIInquilino=? WHERE matricula=?", [dni, matricula]);
        return { success: true, message: 'Vehículo alquilado correctamente.' };
    } catch (error) {
        console.error("Error al alquilar el vehículo:", error);
        throw error;
    }
};

const cancelRent = async (dni, matricula) => {
    try {
        await db.query("UPDATE cliente SET InicioAlquiler=null, FinAlquiler=null, MatriculaAlq=null WHERE DNI=?", [dni]);
        await db.query("UPDATE vehiculo SET Alquilado=0 WHERE matriculaCar=?", [matricula]);
        await db.query("UPDATE vistageneral SET Alquilado=0, DNIInquilino=null WHERE matricula=?", [matricula]);
        return { success: true, message: 'Vehículo alquilado correctamente.' };
    } catch (error) {
        console.error("Error al alquilar el vehículo:", error);
        throw error;
    }
};

const deleteClient = async (dni) => {
    const sql = "DELETE FROM cliente WHERE dni=?";
    const [results] = await db.query(sql, [dni]);

    return results;
}

const getMaintenance = async (matricula) => {
    const sql = "SELECT * FROM mantenimiento WHERE matriculaMant=?";
    const [results] = await db.query(sql, [matricula]);

    return results;
}

const addMaintenance = async (matricula, modelo, tipo, estado) => {
    const sql = "INSERT INTO mantenimiento VALUES(?, ?, ?, ?)";
    const [results] = await db.query(sql, [matricula, modelo, tipo, estado])
    setMaintenance(1, matricula)
    return results;
}

const deleteMaintenance = async (matricula) => {
    const sql = "DELETE FROM mantenimiento WHERE matriculaMant=?";
    const [results] = await db.query(sql, [matricula]);
    setMaintenance(0, matricula);
    return results;
}

const setMaintenance = async (mantenimiento, matricula) => {
    db.query("UPDATE vehiculo SET enmantenimiento=? WHERE matriculacar=?", [mantenimiento, matricula]);
    db.query("UPDATE vistageneral SET enmantenimiento=? WHERE matricula=?", [mantenimiento, matricula]);
}

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
}