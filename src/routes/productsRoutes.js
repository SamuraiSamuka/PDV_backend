import { Router } from "express";
import * as produtos from "../controllers/productsController.js";
import {
  productPartiallyUpdateSchema,
  productSchema,
} from "../middlewares/validateProduct.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.post("/", validate(productSchema), produtos.criarProduto);
router.get("/", produtos.listarProdutos);
router.get("/:id", produtos.buscarProduto);
router.get("/:id/saldo", produtos.buscarSaldoProduto);
router.put("/:id", validate(productSchema), produtos.modificarProduto);
router.patch(
  "/:id",
  validate(productPartiallyUpdateSchema),
  produtos.atualizarProdutoParcialmente
);
router.delete("/:id", produtos.deletarProduto);

export default router;
