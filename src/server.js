import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './index.js';
import path from 'path';
import url from 'url';


const app = express();

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, "../..", "public");

app.use(express.static(diretorioPublico));

app.use(cors());
app.use(express.json());

dotenv.config();

routes(app);


app.listen(process.env.HOST, () => {
  console.log(`Servidor rodando na porta ${process.env.HOST}`);
});
