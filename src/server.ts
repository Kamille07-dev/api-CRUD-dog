import express from "express";
import router from "./routes/routes";

const app = express()
const port = process.env.PORT;


app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
