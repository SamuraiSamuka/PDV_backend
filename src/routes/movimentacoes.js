import { Router } from "express";
import {
  criarMovimentacao,
  listarMovimentacoes,
  listarMovimentacoesPorProdutos,
} from "../controllers/movimentacoesController.js";

const router = Router();

router.post("/", criarMovimentacao);
router.get("/", listarMovimentacoes);
router.get("/:id", listarMovimentacoesPorProdutos);

export default router;
