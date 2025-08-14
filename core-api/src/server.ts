import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import { stores } from "./routes/stores";
import { products } from "./routes/products";

const app = express();
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/health", (_req,res)=> res.json({ ok:true }));
app.use("/stores", stores);
app.use("/products", products);

export default app;
if (require.main === module) {
  const port = Number(process.env.PORT ?? 4000);
  app.listen(port, ()=> console.log(`[core-api] :${port}`));
}
