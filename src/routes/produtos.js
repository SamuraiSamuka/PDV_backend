import { Router } from "express";
import * as produtos from "../controllers/produtosController.js";
import {
  validarProduto,
  validarProdutoPatch,
} from "../middlewares/validarProduto.js";

const router = Router();

router.post("/", validarProduto, produtos.criar);
router.get("/", produtos.listar);
router.get("/:id", produtos.buscarUm);
router.put("/:id", validarProduto, produtos.atualizar);
router.patch("/:id", validarProdutoPatch, produtos.modificar);
router.delete("/:id", produtos.deletar);

export default router;
