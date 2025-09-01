import pool from "../db/index.js";

export const registrarMovimentacao = async (produtoId, tipo, quantidade) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1. Registra a movimentação
    const insertMov = await client.query(
      `INSERT INTO movimentacoes (produto_id, tipo, quantidade) VALUES ($1, $2, $3) RETURNING *`,
      [produtoId, tipo, quantidade]
    );

    // 2. Atualiza estoque
    const operacao = tipo === "entrada" ? "+" : "-";
    const updateProd = await client.query(
      `UPDATE produtos SET quantidade = quantidade ${operacao} $1 WHERE id = $2 RETURNING *`,
      [quantidade, produtoId]
    );

    await client.query("COMMIT");
    return { movimentacao: insertMov.rows[0], produto: updateProd.rows[0] };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
