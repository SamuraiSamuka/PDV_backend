import express from "express";
import dotenv from "dotenv";
import produtosRouter from "./routes/produtos.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use("/produtos", produtosRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
