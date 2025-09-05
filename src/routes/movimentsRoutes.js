import { Router } from "express";
import {
  criarMovimentacao,
  listarMovimentacoes,
  listarMovimentacoesPorProdutos,
} from "../controllers/movimentsController.js";
import { validate } from "../middlewares/validate.js";
import { movimentSchema } from "../middlewares/validateMoviment.js";

const router = Router();

router.post("/", validate(movimentSchema), criarMovimentacao);
router.get("/", listarMovimentacoes);
router.get("/:id", listarMovimentacoesPorProdutos);

export default router;
