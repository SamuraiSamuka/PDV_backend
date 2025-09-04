import pool from "../db/index.js";

export const createProduct = async (nome, preco, quantidade) => {
  const result = await pool.query(
    "INSERT INTO produtos (nome, preco, quantidade) VALUES ($1, $2, $3) RETURNING *",
    [nome, preco, quantidade]
  );
  return result.rows[0];
};

export const listProducts = async () => {
  const result = await pool.query("SELECT * FROM produtos ORDER BY id");
  return result.rows;
};

export const findProductById = async (id) => {
  const result = await pool.query("SELECT * FROM produtos WHERE id=$1", [id]);
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
