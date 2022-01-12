const fireapp = require("./functions/firebaseInitialize");
const express = require("express");
var hbs = require("express-handlebars");
const path = require("path");
const fileUpload = require("express-fileupload");

//inicia o express
const app = express();
const PORT = process.env.PORT || 3000;

//definine a pasta estatica
app.use(express.static(path.join(__dirname, 'public')));

//cria view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials'
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.listen(PORT, () => {
    console.log("Servidor executando na porta: " + PORT);
  });

module.exports = app;