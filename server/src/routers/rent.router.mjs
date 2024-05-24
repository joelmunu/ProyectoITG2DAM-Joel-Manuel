import { Router } from "express";
import rentController from "../controllers/rent.controller.mjs";

const router = Router();

router.route('/rentacartf/vistageneral').get(rentController.getVistaGeneral); // Endpoint to get data from the general view

router.route('/rentacartf/vehicles').get(rentController.getVehicles) // Endpoint to get all vehicles
                                    .post(rentController.addVehicle); // Endpoint to create a new vehicle

router.route('/rentacartf/rent').put(rentController.rentVehicle); // Endpoint to rent cars
router.route('/rentacartf/cancelRent').put(rentController.cancelRent); // Endpoint to cancel rentals

router.route('/rentacartf/vehicle/:matriculaParam').get(rentController.getVehicleByPlate) // Endpoint to get a vehicle by its plate
                                                    .put(rentController.editVehicle)       // Endpoint to edit a vehicle by its plate
                                                    .delete(rentController.deleteVehicle); // Endpoint to delete a vehicle by its plate
                                                    

router.route('/rentacartf/clients').get(rentController.getClients) // Endpoint to get all clients
                                    .post(rentController.addClient) // Endpoint to add clients
                                    .put(rentController.updateBalance); // Endpoint to update a client's balance

router.route('/rentacartf/client/:dniParam').get(rentController.getClientByDNI) // Endpoint to get a client by their ID
                                             .put(rentController.editClient) // Endpoint to edit a client by their ID
                                             .delete(rentController.deleteClient); // Endpoint to delete a client by their ID
                                        
router.route('/rentacartf/maintenance').post(rentController.addMaintenance); // Endpoint to add vehicles to maintenance

router.route('/rentacartf/maintenance/:matricula').delete(rentController.deleteMaintenance) // Endpoint to delete vehicles from maintenance
                                                    .get(rentController.getMaintenance); // Endpoint to see details of a vehicle in maintenance

export default router;
