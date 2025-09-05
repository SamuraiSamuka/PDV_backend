import Joi from "joi";

export const productSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required().messages({
    "string.empty": "O nome é obrigatório.",
    "string.min": "O nome deve ter pelo menos {#limit} caracteres.",
    "string.max": "O nome não pode ter mais de {#limit} caracteres.",
    "any.required": "O campo nome é obrigatório.",
  }),
  preco: Joi.number().precision(2).min(0).required().messages({
    "number.min": "O preço não pode ser negativo.",
    "number.base": "O preço deve ser um número.",
    "any.required": "O campo preço é obrigatório.",
  }),
  quantidade: Joi.number().integer().min(0).required().messages({
    "number.base": "A quantidade deve ser um número inteiro.",
    "number.min": "A quantidade não pode ser negativa.",
    "any.required": "O campo quantidade é obrigatório.",
  }),
});

export const productPartiallyUpdateSchema = Joi.object({
  nome: Joi.string().min(3).max(100).optional().messages({
    "string.min": "O nome deve ter pelo menos {#limit} caracteres.",
    "string.max": "O nome não pode ter mais de {#limit} caracteres.",
  }),
  preco: Joi.number().precision(2).min(0).optional().messages({
    "number.min": "O preço não pode ser negativo.",
    "number.base": "O preço deve ser um número.",
  }),
  quantidade: Joi.number().integer().min(0).optional().messages({
    "number.base": "A quantidade deve ser um número inteiro.",
    "number.min": "A quantidade não pode ser negativa.",
  }),
})
  .min(1)
  .messages({
    "object.min": "Ao menos um valor/campo deve ser fornecido para ser atualizado.",
  });
