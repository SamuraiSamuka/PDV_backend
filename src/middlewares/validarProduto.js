import { body, validationResult } from "express-validator";

export const validarProduto = [
  body("nome").isString().withMessage("O nome deve ser texto."),
  body("preco").isFloat({ gt: 0 }).withMessage("O preço deve ser maior que 0."),
  body("quantidade").isInt({ min: 0 }).withMessage("A quantidade deve ser >= 0"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Pelo menos um dos campos é inválido ou está ausente.",
        data: errors.array(),
      });
    }
    next();
  },
];

export const validarProdutoPatch = [
  body("nome").optional().isString().withMessage("O nome deve ser texto."),
  body("preco")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("O preço deve ser maior que 0."),
  body("quantidade")
    .optional()
    .isInt({ min: 0 })
    .withMessage("A quantidade deve ser >= 0"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        data: errors.array(),
      });
    }
    next();
  },
];
