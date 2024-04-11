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
    const { matriculaCar, fabricante, modelo, motorizacion, antiguedad } = req.body;

    if (!matriculaCar || !fabricante || !modelo || !motorizacion || !antiguedad) {
        console.log(`ERROR: Missing ${!matriculaCar ? 'matriculaCar' : ''} ${!fabricante ? 'fabricante' : ''} ${!modelo ? 'modelo' : ''} ${!motorizacion ? 'motorizacion' : ''} ${!antiguedad ? 'antiguedad' : ''} field(s)`);

        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: 'Bad Request',
            message: 'Error: Los parámetros matrícula, fabricante, modelo, motorizacion, and antigüedad se requieren',
            data: null
        });
    };

    try {
        const data = await rentService.addVehicle(matriculaCar, fabricante, modelo, motorizacion, antiguedad);
        res.send({
            statusCode: httpCodes.OK,
            statusMessage: 'OK',
            message:
                !data || data.length === 0
                    ? 'La tabla vehículo esta vacía'
                    : 'Vehículo añadido correctamente',
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

const editVehicle = async (req, res) => {
    const { matriculaParam } = req.params;
    const { fabricante, modelo, motorizacion, antiguedad } = req.body;

    if (!fabricante || !modelo || !motorizacion || !antiguedad) {
        res.status(httpCodes.OK)
            .send({
                statusCode: httpCodes.OK,
                statusMessage: 'Bad Request',
                message: 'Error: Los parámetros matrícula, fabricante, modelo, motorizacion, and antigüedad se requieren',
                data: null
            });
    };

    try {
        const data = await rentService.editVehicle(fabricante, modelo, motorizacion, antiguedad, matriculaParam);
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

export default {
    getVistaGeneral,
    getVehicles,
    getVehicleByPlate,
    addVehicle,
    editVehicle,
    deleteVehicle
}