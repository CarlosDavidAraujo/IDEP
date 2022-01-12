//este modulo inicia o firebase com as chaves do projeto
const { initializeApp } = require("firebase/app");
const config = require("../firebasekeys/service-account");
const fireapp = initializeApp(config);

module.exports = fireapp;