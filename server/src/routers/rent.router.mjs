import { Router } from "express";
import rentController from "../controllers/rent.controller.mjs";

const router = Router();

//Endpoint para obtener los datos de la vista general
router.route('/rentacartf/vistageneral').get(rentController.getVistaGeneral);

//Endpoint para obtener todos los vehiculos
router.route('/rentacartf/vehiculos').get(rentController.getVehicles)
                                    .post(rentController.addVehicle);

router.route('/rentacartf/vehiculo/:matriculaParam').get(rentController.getVehicleByPlate)
                                                    .put(rentController.editVehicle)
                                                    .delete(rentController.deleteVehicle);

export default router;