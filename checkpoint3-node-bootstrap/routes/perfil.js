//importações
import express from "express"
import axios from 'axios';
import { statusDoUsuario, editaDados, coletaDados } from "../functions/User.js";
const router = express.Router();

//esta função carrega os municípios do Ceará fornecidos pela api do IBGE 
var municipios;
axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/23/municipios')
    .then(function (response) {
        municipios = response.data
    })

//Rotas:

//pagian de perfil
router.get('/perfil', (req, res) => {
    const isOn = statusDoUsuario();
    if (isOn) {
        res.render('Paginas/Perfil/index', { isOn })
    }
    else {
        res.redirect('/login')
    }
});

//edição de perfil
router.get('/perfil/edit', (req, res) => {
    const isOn = statusDoUsuario();
    if (isOn) {
        coletaDados().then((dados) => {
            res.render('Paginas/Perfil/edit', { isOn, municipios, dados });
        })
    }
    else {
        res.redirect('/login')
    }
});

//ao submeter o form de edição de perfil
router.post('/perfil/edit', (req, res) => {
    var dados = {
        CPF: req.body.CPF,
        NomeCompleto: req.body.nomeCompleto,
        NomeSocial: req.body.nomeSocial,
        Gênero: req.body.genero,
        DataDeNascimento: req.body.dataNascimento,
        Email: req.body.email,
        Telefone: `(${req.body.ddd})${req.body.fone}`,
        Município: req.body.municipio,
        Bairro: req.body.bairro,
        Endereço: req.body.endereco,
        Número: req.body.n,
    }
    editaDados(req.body.email, dados);
    res.redirect('/perfil')
}
);

export default router;