//importações
import express from "express"
import axios from 'axios';
import { fazLogin, statusDoUsuario, logout, resetSenha, verificaErro } from "../functions/User.js";
const router = express.Router();

//esta função carrega os municípios do Ceará fornecidos pela api do IBGE 
var municipios;
axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/23/municipios')
    .then(function (response) {
        municipios = response.data
    })

    

//rotas:
//página de login
router.get('/login', (req, res) => {
    const isOn = statusDoUsuario();
    if (isOn) {
        res.redirect('/perfil')
    }
    else {
        res.render('Paginas/Login/index', { isOn })
    }
});

//autentica o login e redireciona para a pagina de perfil
router.post('/login', (req, res, next) => {
    console.log(req.body.email)
    fazLogin(req.body.email, req.body.senha).then((userCredential) => {
        res.redirect('/perfil');
    })
    .catch((error) => {
        const errorCode = error.code;
        let mensagemDeErro = verificaErro(errorCode);
        res.render("Paginas/Login/index", {mensagemDeErro})
    });
});

//ao fazer logout redireciona para a home
router.get('/logout', (req, res, next) => {
    logout().then(() => {
        res.redirect('/')
    })
});

router.get('/login/reautenticacao', (req, res) => {
    const isOn = statusDoUsuario();
    if (isOn) {
        res.redirect('/perfil')
    } else {
        res.render('Paginas/Login/reautenticacao');
    }
})

router.post('/login/reautenticacao', (req, res) => {
    if (req.body.email)
    resetSenha(req.body.email)
})

router.get('/novasenha', (req, res) => {
    const isOn = statusDoUsuario();
    if (isOn) {
        res.redirect('/perfil')
    } else {
    res.render('Paginas/Login/novasenha');
    }
})

export default router;

