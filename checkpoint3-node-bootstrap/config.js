const fireapp = require("./functions/firebaseInitialize");
const express = require("express");
var exphbs = require("express-handlebars");
const path = require("path");
const fileUpload = require("express-fileupload");

//inicia o express
const app = express();
const PORT = process.env.PORT || 3000;

//definine a pasta estatica
app.use(express.static(path.join(__dirname, 'public')));

//cria view engine
const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials',
  //custom helpers
  helpers: {
    when: (operand_1, operator, operand_2, options) => {
      let operators = {                     //  {{#when <operand1> 'eq' <operand2>}}
        'eq': (l, r) => l == r,              //  {{/when}}
        'noteq': (l, r) => l != r,
        'gt': (l, r) => (+l) > (+r),                        // {{#when var1 'eq' var2}}
        'gteq': (l, r) => ((+l) > (+r)) || (l == r),        //               eq
        'lt': (l, r) => (+l) < (+r),                        // {{else when var1 'gt' var2}}
        'lteq': (l, r) => ((+l) < (+r)) || (l == r),        //               gt
        'or': (l, r) => l || r,                             // {{else}}
        'and': (l, r) => l && r,                            //               lt
        '%': (l, r) => (l % r) === 0                        // {{/when}}
      }
      let result = operators[operator](operand_1, operand_2);
      if (result) return options.fn(this);
      return options.inverse(this);
    }
  }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.listen(PORT, () => {
  console.log("Servidor executando na porta: " + PORT);
});

module.exports = app;