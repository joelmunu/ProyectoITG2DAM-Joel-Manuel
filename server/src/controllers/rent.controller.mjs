import rentService from "../services/rent.service.mjs";
import httpCodes from "../errors/httpCodes.mjs";

// Function to get general view data
const getVistaGeneral = async (req, res) => {
    if (!req.query.name) {
        try {
            const data = await rentService.getVistaGeneral();
            res.send({
                statusCode: httpCodes.OK,
                statusMessage: 'OK',
                message:
                    !data || data.length === 0
                        ? 'The general view table is empty'
                        : 'Records from the general view table returned successfully',
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

// Function to get all vehicles
const getVehicles = async (req, res) => {
    if (!req.query.name) {
        try {
            const data = await rentService.getVehicles();
            res.send({
                statusCode: httpCodes.OK,
                statusMessage: 'OK',
                message:
                    !data || data.length === 0
                        ? 'The vehicles table is empty'
                        : 'Records from the vehicles table returned successfully',
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

// Function to get a vehicle by its plate number
const getVehicleByPlate = async (req, res) => {
    const { matriculaParam } = req.params;

    if (!matriculaParam) {
        res.status(httpCodes.BAD_REQUEST)
            .send({
                statusCode: httpCodes.BAD_REQUEST,
                statusMessage: 'Bad Request',
                message: 'Error: The plate parameter is required',
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
                    ? 'Error: The vehicle is not found'
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

// Function to add a new vehicle
const addVehicle = async (req, res) => {
    const { matriculaCar, fabricante, modelo, motorizacion, antiguedad, descripcion, tipoVehiculo, precioDia } = req.body;

    if (!matriculaCar || !fabricante || !modelo || !motorizacion || !antiguedad || !descripcion || !tipoVehiculo || !precioDia) {
        console.log(`ERROR: Missing ${!matriculaCar ? 'matriculaCar' : ''} ${!fabricante ? 'fabricante' : ''} ${!modelo ? 'modelo' : ''} ${!motorizacion ? 'motorizacion' : ''} ${!antiguedad ? 'antiguedad' : ''} ${!descripcion ? 'descripcion' : ''} ${!tipoVehiculo ? 'tipoVehiculo' : ''} ${!precioDia ? 'precioDia' : ''} field(s)`);

        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: 'Bad Request',
            message: 'Error: All parameters are required',
            data: null
        });
    }

    try {
        const newVehicle = await rentService.addVehicle(matriculaCar, fabricante, modelo, motorizacion, antiguedad, descripcion, tipoVehiculo, precioDia);
        res.send({
            statusCode: httpCodes.OK,
            statusMessage: 'OK',
            message: 'Vehicle added successfully',
            data: newVehicle // Returns the added vehicle data
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

// Function to edit a vehicle
const editVehicle = async (req, res) => {
    const { matriculaParam } = req.params;
    const { fabricante, modelo, motorizacion, antiguedad, descripcion, tipoVehiculo, precioDia } = req.body;

    if (!fabricante || !modelo || !motorizacion || !antiguedad || !descripcion || !tipoVehiculo || !precioDia) {
        res.status(httpCodes.OK)
            .send({
                statusCode: httpCodes.OK,
                statusMessage: 'Bad Request',
                message: 'Error: All parameters are required',
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
                    ? 'Error: The vehicle to be edited is not found'
                    : 'Vehicle modified successfully',
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

// Function to delete a vehicle
const deleteVehicle = async (req, res) => {
    const { matriculaParam } = req.params;

    if (!matriculaParam) {
        res.status(httpCodes.OK)
            .send({
                statusCode: httpCodes.OK,
                statusMessage: 'Bad Request',
                message: 'Error: The plate parameter is required',
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
                    ? 'Error: The vehicle to be deleted is not found'
                    : 'Vehicle deleted successfully',
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

// Function to rent a vehicle
const rentVehicle = async (req, res) => {
    const { matricula, dni, InicioAlquiler, FinAlquiler } = req.body;

    if (!dni || !InicioAlquiler || !FinAlquiler) {
        return res.status(httpCodes.OK).send({
            statusCode: httpCodes.OK,
            statusMessage: 'Bad Request',
            message: 'Error: All parameters are required',
            data: null
        });
    }

    try {
        const data = await rentService.rentVehicle(dni, InicioAlquiler, FinAlquiler, matricula);
        return res.send({
            statusCode: httpCodes.OK,
            statusMessage: 'OK',
            message: !data || data.length === 0
                ? 'Error: The vehicle to be rented is not found'
                : 'Vehicle modified successfully',
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

// Function to cancel a vehicle rent
const cancelRent = async (req, res) => {
    const { matricula, dni } = req.body;

    if (!dni || !matricula) {
        return res.status(httpCodes.OK).send({
            statusCode: httpCodes.OK,
            statusMessage: 'Bad Request',
            message: 'Error: All parameters are required',
            data: null
        });
    }

    try {
        const data = await rentService.cancelRent(dni, matricula);
        return res.send({
            statusCode: httpCodes.OK,
            statusMessage: 'OK',
            message: !data || data.length === 0
                ? 'Error: The vehicle to be rented is not found'
                : 'Vehicle modified successfully',
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

// Function to get all clients
const getClients = async (req, res) => {
    if (!req.query.name) {
        try {
            const data = await rentService.getClients();
            res.send({
                statusCode: httpCodes.OK,
                statusMessage: 'OK',
                message:
                    !data || data.length === 0
                        ? 'Error: The clients table is empty'
                        : 'Records from the client table returned successfully',
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

// Function to get a client by their DNI
const getClientByDNI = async (req, res) => {
    const { dniParam } = req.params;

    if (!dniParam) {
        res.status(httpCodes.BAD_REQUEST)
            .send({
                statusCode: httpCodes.BAD_REQUEST,
                statusMessage: 'Bad Request',
                message: 'Error: The dni parameter is required',
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
                    ? 'Error: The client is not found'
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

// Function to add a new client
const addClient = async (req, res) => {
    const { dni, nombre, apellidos, email, password } = req.body;

    if (!dni || !nombre || !apellidos || !email || !password) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: 'Bad Request',
            message: 'Error: The parameters dni, name, last name, email, and password are required',
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
                    ? 'Error: The clients table is empty'
                    : 'Client added successfully',
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

// Function to edit a client
const editClient = async (req, res) => {
    const { dniParam } = req.params;
    const { nombre, apellidos, email } = req.body;

    if (!nombre || !apellidos || !email) {
        res.status(httpCodes.OK)
            .send({
                statusCode: httpCodes.OK,
                statusMessage: 'Bad Request',
                message: 'Error: All parameters are required',
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
                    ? 'Error: The client to be edited is not found'
                    : 'Vehicle modified successfully',
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

// Function to update a client's balance
const updateBalance = async(req, res) => {
    const { dni, Saldo } = req.body;

    if (!dni || !Saldo) {
        res.status(httpCodes.OK)
            .send({
                statusCode: httpCodes.OK,
                statusMessage: 'Bad Request',
                message: 'Error: All parameters are required',
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
                    ? 'Error: The client to be edited is not found'
                    : 'Vehicle modified successfully',
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

// Function to delete a client
const deleteClient = async (req, res) => {
    const { dniParam } = req.params;
    if (!dniParam) {
        res.status(httpCodes.OK)
            .send({
                statusCode: httpCodes.OK,
                statusMessage: 'Bad Request',
                message: 'Error: The dni parameter is required',
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
                    ? 'Error: The client to be deleted is not found'
                    : 'Client deleted successfully from the client table',
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

// Function to get maintenance records for a vehicle
const getMaintenance = async (req, res) => {
    const { matricula } = req.params;

    if (!matricula) {
        res.status(httpCodes.OK)
            .send({
                statusCode: httpCodes.OK,
                statusMessage: 'Bad Request',
                message: 'Error: The plate parameter is required',
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
                        ? 'Error: The maintenance table is empty'
                        : 'Record from the maintenance table returned successfully',
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

// Function to add maintenance record for a vehicle
const addMaintenance = async (req, res) => {
    const { matricula, modelo, tipo, estado } = req.body;

    if (!matricula || !modelo || !tipo || !estado) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: 'Bad Request',
            message: 'Error: The parameters matricula, modelo, tipo, and estado are required',
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
                    ? 'Error: The maintenance table is empty'
                    : 'Vehicle added to the maintenance table',
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

// Function to delete maintenance record for a vehicle
const deleteMaintenance = async (req, res) => {
    const { matricula } = req.params;

    if (!matricula) {
        res.status(httpCodes.OK)
            .send({
                statusCode: httpCodes.OK,
                statusMessage: 'Bad Request',
                message: 'Error: The plate parameter is required',
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
                    ? 'Error: The vehicle to be deleted from the maintenance table is not found'
                    : 'Vehicle deleted successfully from the maintenance table',
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
