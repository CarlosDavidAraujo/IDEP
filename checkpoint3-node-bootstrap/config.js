import fireapp from "./functions/firebaseInitialize.js"
import express from "express";
import {engine} from "express-handlebars";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//para reconhecer __dirname em ES module scope.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//inicia o express

const app = express();
const PORT = process.env.PORT || 3000;

//definine a pasta estatica
app.use(express.static(path.join(__dirname, 'public')));

//cria view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.listen(PORT, () => {
    console.log("Servidor executando na porta: " + PORT);
  });

  
export default app;