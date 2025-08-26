import { Router } from "express";
import * as dogController from "../controller/dogController"
import * as consultaController from "../controller/consultaController"

const router = Router();

router.get("/dog", dogController.getDog);
router.get("/dog/:id", dogController.getDog);
router.post("/dog", dogController.createDog); // exemplo para criar carro
router.delete("/dog/:id", dogController.deleteDog); // exemplo para deletar carro
router.patch("/dog/:id", dogController.updateDog); // exemplo para atualizar carro


router.get("/consulta", consultaController.getConsult);
router.get("/dog/:id", consultaController.getConsult);
router.post("/consulta", consultaController.createConsult); // exemplo para criar carro
router.delete("/consulta/:id", consultaController.deleteConsult); // exemplo para deletar carro
router.patch("/consulta/:id", consultaController.updateConsult); // exemplo para atualizar carro

export default router