import pool from "../db/index.js";

export const createProduct = async (nome, preco, quantidade) => {
  const client = await pool.connect();
  try {
    client.query("BEGIN");

    //1. Registra o produto
    const result = await pool.query(
      "INSERT INTO produtos (nome, preco, quantidade) VALUES ($1, $2, $3) RETURNING *",
      [nome, preco, quantidade]
    );

    const produto = result.rows[0];

    //2. Insere o produto na tabela de movimentações
    if (quantidade > 0) {
      const insertMov = await client.query(
        `INSERT INTO movimentacoes (produto_id, tipo, quantidade) VALUES ($1, $2, $3) RETURNING *`,
        [produto.id, "entrada", quantidade]
      );
    }

    await client.query("COMMIT");
    return produto;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const listProducts = async () => {
  const result = await pool.query("SELECT * FROM produtos ORDER BY id");
  return result.rows;
};

export const findProductById = async (id) => {
  const result = await pool.query("SELECT * FROM produtos WHERE id=$1", [id]);
  return result.rows[0];
};

export const getProductBalance = async (id) => {
  const result = await pool.query("SELECT quantidade FROM produtos WHERE id=$1", [
    id,
  ]);
  return result.rows[0];
};

export const updateProduct = async (nome, preco, quantidade, id) => {
  const result = await pool.query(
    "UPDATE produtos SET nome=$1, preco=$2, quantidade=$3 WHERE id=$4 RETURNING *",
    [nome, preco, quantidade, id]
  );
  return result.rows[0];
};

export const partiallyUpdateProduct = async (id, camposParaAtualizar) => {
  const campos = [];
  const valores = [];
  let contador = 1;

  for (const [campo, valor] of Object.entries(camposParaAtualizar)) {
    if (valor !== undefined) {
      campos.push(`${campo}=$${contador++}`);
      valores.push(valor);
    }
  }

  if (campos.length === 0) {
    return null;
  }

  valores.push(id);

  const result = await pool.query(
    `UPDATE produtos SET ${campos.join(", ")} WHERE id=$${contador} RETURNING *`,
    valores
  );

  return result.rows[0] || null;
};

export const deleteProduct = async (id) => {
  const result = await pool.query("DELETE FROM produtos WHERE id=$1 RETURNING *", [
    id,
  ]);

  return result.rows[0];
};
