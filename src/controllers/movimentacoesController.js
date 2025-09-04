import * as produtctMovementsModel from "../models/movimentacoesModel.js";

export const criarMovimentacao = async (req, res, next) => {
  const { produto_id, tipo, quantidade } = req.body;
  try {
    if (!produto_id || !tipo || !quantidade) {
      return res.status(400).json({ success: false, message: "Dados incompletos." });
    }

    if (!["entrada", "saida"].includes(tipo)) {
      return res.status(400).json({ success: false, message: "Tipo inválido." });
    }
    const result = await produtctMovementsModel.createStockMovement(
      produto_id,
      tipo,
      quantidade
    );

    res.status(201).json({
      success: true,
      message: "Movimentação registrada e estoque atualizado.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const listarMovimentacoes = async (req, res, next) => {
  try {
    const movimentacoes = await produtctMovementsModel.listAllStockMovement();
    res.status(201).json({
      success: true,
      message: "Lista de movimentações carregada.",
      data: movimentacoes,
    });
  } catch (error) {
    next(error);
  }
};

export const listarMovimentacoesPorProdutos = async (req, res, next) => {
  const { id } = req.params;
  try {
    const movimentacao = await produtctMovementsModel.listStockMovementByProduct(id);
    if (!movimentacao) {
      return res.status(404).json({
        success: false,
        message: "Nenhuma movimentação encontrada para este produto.",
      });
    }
    res.status(201).json({
      success: true,
      message: "Movimentacao encontrada",
      data: movimentacao,
    });
  } catch (error) {
    next(error);
  }
};
