//importações
import express from 'express';
import axios from 'axios';
import { cadastraUsuario, statusDoUsuario, dataDeCadastro, verificaErro } from '../../functions/User.js';
const router = express.Router();

//esta função carrega os municípios do Ceará fornecidos pela api do IBGE 
var municipios;
axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/23/municipios')
    .then(function (response) {
        municipios = response.data
    })

const mudaBotao = true;

//Rotas:
//formulario de cadastro do usuario
router.get('/cadastro', (req, res) => {
    const online = statusDoUsuario();
    if (online) {
        res.redirect('/perfil');
    }
    else {
        res.render('Paginas/Cadastro/index', { municipios, mudaBotao });
    }
});

//quando o usuario submete os dados:
router.post('/cadastro', (req, res) => {
    const dados_de_cadastro = {
        CPF: req.body.CPF,
        Nome_completo: req.body.nome_completo,
        Nome_social: req.body.nome_social,
        Gênero: req.body.genero,
        Data_de_nascimento: req.body.data_de_nascimento,
        Email: req.body.email,
        Telefone: req.body.fone,
        Município: req.body.municipio,
        Bairro: req.body.bairro,
        Data_de_cadastramento: dataDeCadastro()
    }
    cadastraUsuario(req.body.email, req.body.senha, dados_de_cadastro).then((userCredential) => {
        res.redirect('/perfil');
    })
        .catch((error) => {
            const errorCode = error.code;
            let mensagemDeErro = verificaErro(errorCode);
            res.render('Paginas/Cadastro/index', { municipios, mensagemDeErro, mudaBotao });
        });
});

export default router;