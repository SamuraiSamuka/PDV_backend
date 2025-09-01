import pool from "../db/index.js";
import * as produtosModel from "../models/produtosModel.js";

// Códigos HTTP
/*
 * 200 -> OK
 * 201 -> Criado
 * 204 -> Sem conteúdo (delete bem-sucessido)
 * 400 -> Requisição inválida
 * 404 -> não encontrado
 * 500 -> erro no servidor
 */

// CREATE
export const criar = async (req, res, next) => {
  const { nome, preco, quantidade } = req.body;
  if (!nome || !preco || !quantidade) {
    return res.status(400).json({
      success: false,
      message: "Todos os campos (nome, preco, quantidade) são obrigatórios.",
    });
  }

  try {
    const novoProduto = await produtosModel.createProduto(nome, preco, quantidade);
    res.status(201).json({
      success: true,
      data: novoProduto,
      message: "Produto criado com sucesso.",
    });
  } catch (err) {
    next(err);
  }
};

// READ ALL
export const listar = async (req, res, next) => {
  try {
    const produtos = await produtosModel.listarProdutos();
    res.status(200).json({
      success: true,
      data: produtos,
      message: "Lista de produtos carregada.",
    });
  } catch (err) {
    next(err);
  }
};

// READ ONE
export const buscarUm = async (req, res, next) => {
  const { id } = req.params;
  try {
    const produto = await produtosModel.buscarUm(id);
    if (!produto) {
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado.",
      });
    }
    res.json({
      success: true,
      data: produto,
      message: "Produto encontrado.",
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const atualizar = async (req, res, next) => {
  const { id } = req.params;
  const { nome, preco, quantidade } = req.body;

  if (!nome || !preco || !quantidade) {
    return res.status(400).json({
      success: false,
      message:
        "Todos os campos devem conter valores válidos. Para atualizar apenas um campo utilize o verbo PATCH.",
    });
  }

  try {
    const produtoAtualizado = produtosModel.atualizar(nome, preco, quantidade, id);

    if (!produtoAtualizado) {
      return res.status(400).json({
        success: false,
        message: "Produto não encontrado.",
      });
    }
    res.json({
      success: true,
      data: result.rows[0],
      message: "Produto atualizado com sucesso.",
    });
  } catch (err) {
    next(err);
  }
};

// PATCH
export const modificar = async (req, res, next) => {
  const { id } = req.params;
  const { nome, preco, quantidade } = req.body;

  try {
    if (!nome && !preco && !quantidade) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Ao menos um campo deve ser fornecido para atualizar o produto.",
        });
    }
    const produtoModificado = await produtosModel.modificar(id, {
      nome,
      preco,
      quantidade,
    });

    if (!produtoModificado) {
      return res
        .status(404)
        .json({ success: false, message: "Produto não encontrado." });
    }
    return res.json({
      success: true,
      data: produtoModificado,
      message: "Produto atualizado com sucesso.",
    });
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deletar = async (req, res, next) => {
  const { id } = req.params;
  try {
    const produtoDeletado = produtosModel.deletar(id);
    if (!produtoDeletado) {
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Produto deletado com sucesso.",
    }); // No content
  } catch (err) {
    next(err);
  }
};
