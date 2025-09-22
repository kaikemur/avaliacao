import express from "express";
import {  getALLfuncionarios, getFuncionariosByid,createFuncionario,deleteFuncionario, updateFuncionario} from "../controllers/funcionariosControllers.js";

const router = express.Router();

router.get("/",getALLfuncionarios)
router.get("/:id",getFuncionariosByid)
router.post("/",createFuncionario)
router.delete("/:id",deleteFuncionario)
router.put("/:id",updateFuncionario)

export default router;