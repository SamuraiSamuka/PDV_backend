import { Router } from "express";
import * as produtos from "../controllers/produtosController.js";

const router = Router();

router.post("/", produtos.criar);
router.get("/", produtos.listar);
router.get("/:id", produtos.buscarUm);
router.put("/:id", produtos.atualizar);
router.patch("/:id", produtos.modificar);
router.delete("/:id", produtos.deletar);

export default router;
