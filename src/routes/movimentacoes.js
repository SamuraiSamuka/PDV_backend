import { Router } from "express";
import { criarMovimentacao } from "../controllers/movimentacoesController.js";

const router = Router();

router.post("/", criarMovimentacao);

export default router;
