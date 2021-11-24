//importa biblioteca firebase e função de autenticação
const firebase = require('firebase/app');
const Auth = require('firebase/auth');
// configurações do projeto firebase fornecido no próprio site do db
var config = {
  apiKey: "AIzaSyCy9ZLGgSOvn2AEEhYchfRLwWGMah6OzrU",
  authDomain: "projeto-integrado-i.firebaseapp.com",
  projectId: "projeto-integrado-i",
  storageBucket: "projeto-integrado-i.appspot.com",
  messagingSenderId: "682049381020",
  appId: "1:682049381020:web:04041af91af0c3c02d4359",
  measurementId: "G-1TWDZXKXPJ"
};
//inicia o firebase
firebase.initializeApp(config);

//cria um servidor web local utilizando o framework express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

//trata as informações estáticas da página web
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


//retorna a página de cadastro do usuário
app.post("/cadastro", (req, res) => {
  let resposta = '<!DOCTYPE html> <html lang="pt-br"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Resposta</title> </head> <body><p> Usuário cadastrado com sucesso </p> </body></html>';
  //coleta as informações fornecidas nos campos email e senha e gera uma credencial unica para cada usuário
  const auth = Auth.getAuth();
  Auth.createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
      res.write(resposta);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
});

app.listen(PORT, () => {
  console.log("Servidor executando na porta: " + PORT);
});
