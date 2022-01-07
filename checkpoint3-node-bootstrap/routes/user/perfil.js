//importações
import express from "express"
import axios from 'axios';
import { statusDoUsuario, editaPerfil, consultaDadosDoUsuario, verificaErro, mostraCandidatura, auth, cancelaCandidatura } from "../../functions/User.js";
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
    const online = statusDoUsuario();
    if (online) {
        const user_id = auth.currentUser.uid
        mostraCandidatura(user_id).then((candidatura) => {
            res.render('Paginas/Perfil/index', { online, candidatura })
        })
    }
    else {
        res.redirect('/login')
    }
});

//cancela uma candidatura
router.post('/perfil', (req, res) => {
    const user_id = auth.currentUser.uid
    const vaga_id = req.body.vaga_id
    cancelaCandidatura(user_id, vaga_id).then(()=>{
        res.redirect('/perfil')
    })
});

//edição de perfil
router.get('/perfil/edit', (req, res) => {
    const online = statusDoUsuario();
    if (online) {
        consultaDadosDoUsuario().then((dados_de_cadastro) => {
            res.render('Paginas/Perfil/edit', { online, municipios, dados_de_cadastro });
        })
    }
    else {
        res.redirect('/login')
    }
});

//ao submeter o form de edição de perfil
router.post('/perfil/edit', (req, res) => {
    const online = statusDoUsuario();
    var dados_editados = {
        CPF: req.body.CPF,
        Nome_completo: req.body.nome_completo,
        Nome_social: req.body.nome_social,
        Gênero: req.body.genero,
        Data_de_nascimento: req.body.data_de_nascimento,
        Email: req.body.email,
        Telefone: req.body.fone,
        Município: req.body.municipio,
        Bairro: req.body.bairro,
        Endereço: req.body.endereco,
        Número: req.body.n,
    }
    editaPerfil(req.body.email, dados).then(() => {
        res.redirect('/perfil')
    })
        .catch((error) => {
            const errorCode = error.code;
            let mensagemDeErro = verificaErro(errorCode);
            res.render('Paginas/Perfil/edit', { online, municipios, dados_editados, mensagemDeErro });
        });
});

export default router;