import express from "express";
import morgan from "morgan";
import produtosRoutes from "./routes/produtos.js";
import movimentacoesRoutes from "./routes/movimentacoes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Rotas
app.use("/produtos", produtosRoutes);
app.use("/movimentacoes", movimentacoesRoutes);

// Middleware de erro
app.use(errorHandler);

export default app;
