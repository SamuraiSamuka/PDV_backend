import { registrarMovimentacao } from "../models/movimentacoesModel.js";

export const criarMovimentacao = async (req, res, next) => {
  const { produto_id, tipo, quantidade } = req.body;
  try {
    if (!produto_id || !tipo || !quantidade) {
      return res.status(400).json({ success: false, message: "Dados incompletos." });
    }

    if (!["entrada", "saida"].includes(tipo)) {
      return res.status(400).json({ success: false, message: "Tipo inválido." });
    }
    const result = await registrarMovimentacao(produto_id, tipo, quantidade);

    res.status(201).json({
      success: true,
      message: "Movimentação registrada e estoque atualizado.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
