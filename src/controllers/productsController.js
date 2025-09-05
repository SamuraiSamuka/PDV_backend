import * as productsModel from "../models/productsModel.js";
import { criarMovimentacao } from "./movimentsController.js";

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
export const criarProduto = async (req, res, next) => {
  const { nome, preco, quantidade } = req.body;
  try {
    const novoProduto = await productsModel.createProduct(nome, preco, quantidade);
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
export const listarProdutos = async (req, res, next) => {
  try {
    const produtos = await productsModel.listProducts();
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
export const buscarProduto = async (req, res, next) => {
  const { id } = req.params;
  try {
    const produto = await productsModel.findProductById(id);
    if (!produto) {
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado.",
      });
    }
    res.status(201).json({
      success: true,
      data: produto,
      message: "Produto encontrado.",
    });
  } catch (err) {
    next(err);
  }
};

export const buscarSaldoProduto = async (req, res, next) => {
  const { id } = req.params;
  try {
    const saldo = await productsModel.getProductBalance(id);
    if (!saldo) {
      return res
        .status(404)
        .json({ success: false, message: "Produto não encontrado." });
    }
    res.status(201).json({
      success: true,
      data: saldo,
      message: "Produto encontrado.",
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const modificarProduto = async (req, res, next) => {
  const { id } = req.params;
  const { nome, preco, quantidade } = req.body;

  try {
    const produtoAtualizado = productsModel.updateProduct(
      nome,
      preco,
      quantidade,
      id
    );

    if (!produtoAtualizado) {
      return res.status(404).json({
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
export const atualizarProdutoParcialmente = async (req, res, next) => {
  const { id } = req.params;
  const { nome, preco, quantidade } = req.body;

  try {
    const produtoModificado = await productsModel.partiallyUpdateProduct(id, {
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
export const deletarProduto = async (req, res, next) => {
  const { id } = req.params;
  try {
    const produtoDeletado = productsModel.deleteProduct(id);
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
