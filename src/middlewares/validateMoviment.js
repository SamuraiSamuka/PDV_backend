import Joi from "joi";

export const movimentSchema = Joi.object({
  produto_id: Joi.number().integer().required().messages({
    "number.base": "O id deve ser um número inteiro.",
    "any.required": "O campo produto_id é obrigatório",
  }),
  tipo: Joi.string().valid("entrada", "saida").required().messages({
    "string.empty": "O tipo é obrigatório",
    "any.only": "Somente são aceitos os tipos 'entrada' e 'saida'.",
    "any.required": "O campo tipo é obrigatório.",
  }),
  quantidade: Joi.number().integer().min(1).required().messages({
    "number.base": "A quantidade deve um número inteiro positivo.",
    "number.min": "A quantidade deve ser maior que 0.",
    "any.required": "O campo quantidade é obrigatório.",
  }),
});
