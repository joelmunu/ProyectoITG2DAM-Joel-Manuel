import rentService from "../services/rent.service.mjs";
import httpCodes from "../errors/httpCodes.mjs";

const getVistaGeneral = async (req, res) => {
    if (!req.query.name) {
        try {
            const data = await rentService.getVistaGeneral();
            res.send({
                statusCode: httpCodes.OK,
                statusMessage: 'OK',
                message:
                    !data || data.length === 0
                        ? 'La tabla vista general está vacía'
                        : 'Registros de la tabla vista general devueltos correctamente',
                data
            });
        } catch (error) {
            res.status(httpCodes.INTERNAL_SERVER_ERROR)
                .send({
                    statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                    statusMessage: 'Internal Server Error',
                    message: null,
                    data: null
                });
        }
    }
}

const getVehicles = async (req, res) => {
    if (!req.query.name) {
        try {
            const data = await rentService.getVehicles();
            res.send({
                statusCode: httpCodes.OK,
                statusMessage: 'OK',
                message:
                    !data || data.length === 0
                        ? 'La tabla de vehículos está vacía'
                        : 'Registros de la tabla vehículos devueltos correctamente',
                data
            });
        } catch (error) {
            res.status(httpCodes.INTERNAL_SERVER_ERROR)
                .send({
                    statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                    statusMessage: 'Error',
                    message: null,
                    data: null
                });
        }
    }
}

const getVehicleByPlate = async (req, res) => {
    const { matriculaParam } = req.params;

    if (!matriculaParam) {
        res.status(httpCodes.BAD_REQUEST)
            .send({
                statusCode: httpCodes.BAD_REQUEST,
                statusMessage: 'Bad Request',
                message: 'Error: El parámetro matrícula se requiere',
                data: null
            });
    };

    try {
        const data = await rentService.getVehicleByPlate(matriculaParam)
        res.send({
            statusCode: httpCodes.OK,
            statusMessage: 'OK',
            message:
                !data || data.length === 0
                    ? 'Error: No se encuentra el vehiculo' //TODO: Cambiar codigo HTTP
                    : 'OK',
            data
        });
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message: null,
                data: null
            });
    };
}

const addVehicle = async (req, res) => {
    const { matriculaCar, fabricante, modelo, motorizacion, antiguedad, descripcion, tipoVehiculo, precioDia } = req.body;

    if (!matriculaCar || !fabricante || !modelo || !motorizacion || !antiguedad || !descripcion || !tipoVehiculo || !precioDia) {
        console.log(`ERROR: Missing ${!matriculaCar ? 'matriculaCar' : ''} ${!fabricante ? 'fabricante' : ''} ${!modelo ? 'modelo' : ''} ${!motorizacion ? 'motorizacion' : ''} ${!antiguedad ? 'antiguedad' : ''} ${!descripcion ? 'descripcion' : ''} ${!tipoVehiculo ? 'tipoVehiculo' : ''} ${!precioDia ? 'precioDia' : ''} field(s)`);

        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: 'Bad Request',
            message: 'Error: se requieren todos los parámetros',
            data: null
        });
    }

    try {
        const newVehicle = await rentService.addVehicle(matriculaCar, fabricante, modelo, motorizacion, antiguedad, descripcion, tipoVehiculo, precioDia);
        res.send({
            statusCode: httpCodes.OK,
            statusMessage: 'OK',
            message: 'Vehículo añadido correctamente',
            data: newVehicle // Devuelve los datos del vehículo añadido
        });
    } catch (error) {
        console.log(error);
        res.status(httpCodes.INTERNAL_SERVER_ERROR).send({
            statusCode: httpCodes.INTERNAL_SERVER_ERROR,
            statusMessage: 'Internal Server Error',
            message: null,
            data: null
        });
    }
};

const editVehicle = async (req, res) => {
    const { matriculaParam } = req.params;
    const { fabricante, modelo, motorizacion, antiguedad, descripcion, tipoVehiculo, precioDia } = req.body;

    if (!fabricante || !modelo || !motorizacion || !antiguedad || !descripcion || !tipoVehiculo || !precioDia) {
        res.status(httpCodes.OK)
            .send({
                statusCode: httpCodes.OK,
                statusMessage: 'Bad Request',
                message: 'Error: se requieren todos los parámetros',
                data: null
            });
    };

    try {
        const data = await rentService.editVehicle(fabricante, modelo, motorizacion, antiguedad, descripcion, tipoVehiculo, precioDia, matriculaParam);
        res.send({
            statusCode: httpCodes.OK,
            statusMessage: 'OK',
            message:
                !data || data.length === 0
                    ? 'Error: No se encuentra el vehículo que se desea editar'
                    : 'Vehículo modificado correctamente',
            data
        });
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message: null,
                data: null
            });
    };
}

const deleteVehicle = async (req, res) => {
    const { matriculaParam } = req.params;

    if (!matriculaParam) {
        res.status(httpCodes.OK)
            .send({
                statusCode: httpCodes.OK,
                statusMessage: 'Bad Request',
                message: 'Error: El parámetro mátricula es requerido',
                data: null
            });
    };

    try {
        const data = await rentService.deleteVehicle(matriculaParam);
        res.send({
            statusCode: !data || data.length === 0 ? httpCodes.NOT_FOUND : httpCodes.OK,
            statusMessage: 'OK',
            message:
                !data || data.length === 0
                    ? 'Error: No se encuentra el vehículo que se desea editar'
                    : 'Vehículo eliminado correctamente',
            data
        });
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message: null,
                data: null
            });
    }
}

const rentVehicle = async (req, res) => {
    const { matricula, dni, InicioAlquiler, FinAlquiler } = req.body;

    if (!dni || !InicioAlquiler || !FinAlquiler) {
        return res.status(httpCodes.OK).send({
            statusCode: httpCodes.OK,
            statusMessage: 'Bad Request',
            message: 'Error: se requieren todos los parámetros',
            data: null
        });
    }

    try {
        const data = await rentService.rentVehicle(dni, InicioAlquiler, FinAlquiler, matricula);
        return res.send({
            statusCode: httpCodes.OK,
            statusMessage: 'OK',
            message: !data || data.length === 0
                ? 'Error: No se encuentra el vehículo que se desea alquilar'
                : 'Vehículo modificado correctamente',
            data
        });
    } catch (error) {
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({
            statusCode: httpCodes.INTERNAL_SERVER_ERROR,
            statusMessage: 'Internal Server Error',
            message: null,
            data: null
        });
    }
};

const cancelRent = async (req, res) => {
    const { matricula, dni } = req.body;

    if (!dni || !matricula) {
        return res.status(httpCodes.OK).send({
            statusCode: httpCodes.OK,
            statusMessage: 'Bad Request',
            message: 'Error: se requieren todos los parámetros',
            data: null
        });
    }

    try {
        const data = await rentService.cancelRent(dni, matricula);
        return res.send({
            statusCode: httpCodes.OK,
            statusMessage: 'OK',
            message: !data || data.length === 0
                ? 'Error: No se encuentra el vehículo que se desea alquilar'
                : 'Vehículo modificado correctamente',
            data
        });
    } catch (error) {
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({
            statusCode: httpCodes.INTERNAL_SERVER_ERROR,
            statusMessage: 'Internal Server Error',
            message: null,
            data: null
        });
    }
}

const getClients = async (req, res) => {
    if (!req.query.name) {
        try {
            const data = await rentService.getClients();
            res.send({
                statusCode: httpCodes.OK,
                statusMessage: 'OK',
                message:
                    !data || data.length === 0
                        ? 'Error: La tabla clientes esta vacía'
                        : 'Registros de la tabla cliente devueltos correctamente',
                data
            });
        } catch (error) {
            res.status(httpCodes.INTERNAL_SERVER_ERROR)
                .send({
                    statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                    statusMessage: 'Internal Server Error',
                    message: null,
                    data: null
                });
        }
    }
}

const getClientByDNI = async (req, res) => {
    const { dniParam } = req.params;

    if (!dniParam) {
        res.status(httpCodes.BAD_REQUEST)
            .send({
                statusCode: httpCodes.BAD_REQUEST,
                statusMessage: 'Bad Request',
                message: 'Error: El parámetro dni se requiere',
                data: null
            });
    };

    try {
        const data = await rentService.getClientByDNI(dniParam)
        res.send({
            statusCode: httpCodes.OK,
            statusMessage: 'OK',
            message:
                !data || data.length === 0
                    ? 'Error: No se encuentra el cliente'
                    : 'OK',
            data
        });
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message: null,
                data: null
            });
    }
}

const addClient = async (req, res) => {
    const { dni, nombre, apellidos, email, password } = req.body;

    if (!dni || !nombre || !apellidos || !email || !password) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: 'Bad Request',
            message: 'Error: Se requieren los parámetros dni, nombre, apellidos, email y contraseña',
            data: null
        });
    };

    try {
        const data = await rentService.addClient(dni, nombre, apellidos, email, password);
        res.send({
            statusCode: httpCodes.OK,
            statusMessage: 'OK',
            message:
                !data || data.length === 0
                    ? 'Error: La tabla clientes está vacia'
                    : 'Cliente añadido correctamente',
            data
        });
    } catch (error) {
        console.log(error)
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message: null,
                data: null
            });
    }
}

const editClient = async (req, res) => {
    const { dniParam } = req.params;
    const { nombre, apellidos, email } = req.body;

    if (!nombre || !apellidos || !email) {
        res.status(httpCodes.OK)
            .send({
                statusCode: httpCodes.OK,
                statusMessage: 'Bad Request',
                message: 'Error: se requieren todos los parámetros',
                data: null
            });
    };

    try {
        const data = await rentService.editClient(dniParam, nombre, apellidos, email);
        res.send({
            statusCode: httpCodes.OK,
            statusMessage: 'OK',
            message:
                !data || data.length === 0
                    ? 'Error: No se encuentra el cliente que se desea editar'
                    : 'Vehículo modificado correctamente',
            data
        });
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message: null,
                data: null
            });
    }
}

const updateBalance = async(req, res) => {
    const { dni, Saldo } = req.body;

    if (!dni || !Saldo) {
        res.status(httpCodes.OK)
            .send({
                statusCode: httpCodes.OK,
                statusMessage: 'Bad Request',
                message: 'Error: se requieren todos los parámetros',
                data: null
            });
    };

    try {
        const data = await rentService.updateBalance(dni, Saldo);
        res.send({
            statusCode: httpCodes.OK,
            statusMessage: 'OK',
            message:
                !data || data.length === 0
                    ? 'Error: No se encuentra el cliente que se desea editar'
                    : 'Vehículo modificado correctamente',
            data
        });
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message: null,
                data: null
            });
    }
}

const deleteClient = async (req, res) => {
    const { dniParam } = req.params;
    if (!dniParam) {
        res.status(httpCodes.OK)
            .send({
                statusCode: httpCodes.OK,
                statusMessage: 'Bad Request',
                message: 'Error: El parámetro dni es requerido',
                data: null
            });
    };

    try {
        const data = await rentService.deleteClient(dniParam);
        res.send({
            statusCode: !data || data.length === 0 ? httpCodes.NOT_FOUND : httpCodes.OK,
            statusMessage: 'OK',
            message:
                !data || data.length === 0
                    ? 'Error: No se encuentra el cliente que se desea eliminar'
                    : 'Cliente eliminado correctamente de la tabla cliente',
            data
        });
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message: null,
                data: null
            });
    }
}

const getMaintenance = async (req, res) => {
    const { matricula } = req.params;

    if (!matricula) {
        res.status(httpCodes.OK)
            .send({
                statusCode: httpCodes.OK,
                statusMessage: 'Bad Request',
                message: 'Error: El parámetro matrícula es requerido',
                data: null
            });
    };

    if (!req.query.name) {
        try {
            const data = await rentService.getMaintenance(matricula);
            res.send({
                statusCode: httpCodes.OK,
                statusMessage: 'OK',
                message:
                    !data || data.length === 0
                        ? 'Error: La tabla mantenimiento está vacía'
                        : 'Registro de la tabla mantenimiento devuelto correctamente',
                data
            });
        } catch (error) {
            res.status(httpCodes.INTERNAL_SERVER_ERROR)
                .send({
                    statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                    statusMessage: 'Internal Server Error',
                    message: null,
                    data: null
                });
        }
    }
}

const addMaintenance = async (req, res) => {
    const { matricula, modelo, tipo, estado } = req.body;

    if (!matricula || !modelo || !tipo || !estado) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: 'Bad Request',
            message: 'Error: Se requieren los parámetros matrícula, modelo, tipo y estado',
            data: null
        });
    };

    try {
        const data = await rentService.addMaintenance(matricula, modelo, tipo, estado)
        res.send({
            statusCode: httpCodes.OK,
            statusMessage: 'OK',
            message:
                !data || data.length === 0
                    ? 'Error: La tabla mantenimiento está vacía'
                    : 'Vehículo añadido a la tabla mantenimiento',
            data
        });
    } catch (error) {
        console.log(error)
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message: null,
                data: null
            });
    };
}

const deleteMaintenance = async (req, res) => {
    const { matricula } = req.params;

    if (!matricula) {
        res.status(httpCodes.OK)
            .send({
                statusCode: httpCodes.OK,
                statusMessage: 'Bad Request',
                message: 'Error: El parámetro matrícula es requerido',
                data: null
            });
    };

    try {
        const data = await rentService.deleteMaintenance(matricula);
        res.send({
            statusCode: !data || data.length === 0 ? httpCodes.NOT_FOUND : httpCodes.OK,
            statusMessage: 'OK',
            message:
                !data || data.length === 0
                    ? 'Error: No se encuentra el vehículo que se desea eliminar de la tabla mantenimiento'
                    : 'Vehículo eliminado correctamente de la tabla mantenimiento',
            data
        });
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message: null,
                data: null
            });
    }
}

export default {
    getVistaGeneral,
    getVehicles,
    getVehicleByPlate,
    addVehicle,
    editVehicle,
    deleteVehicle,
    rentVehicle,
    cancelRent,
    getClients,
    getClientByDNI,
    addClient,
    editClient,
    updateBalance,
    deleteClient,
    getMaintenance,
    addMaintenance,
    deleteMaintenance
}