//este modulo inicia o firebase com as chaves do projeto
import { initializeApp } from "firebase/app";
import config from "../firebasekeys/service-account.js";

const fireapp = initializeApp(config);

export default fireapp;