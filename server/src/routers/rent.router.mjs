import { Router } from "express";
import rentController from "../controllers/rent.controller.mjs";

const router = Router();

router.route('/rentacartf/vistageneral').get(rentController.getVistaGeneral); // Endpoint para obtener los datos de la vista general

router.route('/rentacartf/vehiculos').get(rentController.getVehicles) // Endpoint para obtener todos los vehiculos
                                    .post(rentController.addVehicle); // Endpoint para crear un nuevo vehiculo

router.route('/rentacartf/rent').put(rentController.rentVehicle); // Endpoint para alquilar coches
router.route('/rentacartf/cancelRent').put(rentController.cancelRent); // Endpoint para cancelar alquileres

router.route('/rentacartf/vehiculo/:matriculaParam').get(rentController.getVehicleByPlate) // Endpoint obtener un vehiculo por su matricula
                                                    .put(rentController.editVehicle)       // Endpoint para editar un vehiculo por su matricula
                                                    .delete(rentController.deleteVehicle); // Endpoint para eliminar un vehiculo por su matricula
                                                    

router.route('/rentacartf/clientes').get(rentController.getClients) // Endpoint para obtener todos los clientes
                                    .post(rentController.addClient) // Endpoint para añadir clientes
                                    .put(rentController.updateBalance); // Endpoint para actualizar el saldo de un cliente

router.route('/rentacartf/cliente/:dniParam').get(rentController.getClientByDNI) // Endpoint para obtener un cliente por su DNI
                                             .put(rentController.editClient) // Endpoint para editar cliente por su DNI
                                             .delete(rentController.deleteClient); // Endpoint para borrar un cliente por su DNI
                                        
router.route('/rentacartf/mantenimiento').post(rentController.addMaintenance); // Endpoint para añadir vehiculos a mantenimiento

router.route('/rentacartf/mantenimiento/:matricula').delete(rentController.deleteMaintenance) // Endpoint para eliminar vehiculos de mantenimiento
                                                    .get(rentController.getMaintenance); // Endpoint para ver los detalles de un vehiculo en mantenimiento

export default router;