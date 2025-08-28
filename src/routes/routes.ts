import { Router } from "express";
import * as dogController from "../controller/dogController"
import * as consultaController from "../controller/consultaController"

const router = Router();

router.get("/dogs", dogController.getDog);
router.get("/dogs/:id", dogController.getDogById);
router.post("/dogs", dogController.createDog); 
router.delete("/dogs/:id", dogController.deleteDog); 
router.patch("/dogs/:id", dogController.updateDog); 


router.get("/consulta", consultaController.getConsult);
router.get("/consulta/:id", consultaController.getConsultById);
router.post("/consulta", consultaController.createConsult); 
router.delete("/consulta/:id", consultaController.deleteConsult); 
router.patch("/consulta/:id", consultaController.updateConsult); 

export default router