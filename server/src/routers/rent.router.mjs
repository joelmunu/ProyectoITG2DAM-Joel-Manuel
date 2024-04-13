import { Router } from "express";
import rentController from "../controllers/rent.controller.mjs";

const router = Router();

// Endpoint para obtener los datos de la vista general
router.route('/rentacartf/vistageneral').get(rentController.getVistaGeneral);

router.route('/rentacartf/vehiculos').get(rentController.getVehicles) // Endpoint para obtener todos los vehiculos
                                    .post(rentController.addVehicle); // Endpoint para crear un nuevo vehiculo

router.route('/rentacartf/vehiculo/:matriculaParam').get(rentController.getVehicleByPlate) //Endpoint obtener un vehiculo por su matricula
                                                    .put(rentController.editVehicle)       //Endpoint para editar un vehiculo por su matricula
                                                    .delete(rentController.deleteVehicle); //Endpoint para eliminar un vehiculo por su matricula

router.route('/rentacartf/clientes').get(rentController.getClients)
                                    .post(rentController.addClient);

router.route('/rentacartf/cliente/:dniParam').get(rentController.getClientByDNI)
                                             .put(rentController.editClient)
                                             .delete(rentController.deleteClient);

export default router;