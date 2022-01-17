const axios = require('axios');
const {
    cadastraUsuario, dataDeCadastro, verificaErro, fazLogin, logout, resetPassword,
    editaPerfil, consultaDadosDoUsuario, mostraCandidatura, auth, cancelaCandidatura
} = require('../functions/User');

//esta função carrega os municípios do Ceará fornecidos pela api do IBGE 
var municipios;
axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/23/municipios')
    .then(function (response) {
        municipios = response.data
    })

module.exports = {
    getCadastro: async (req, res) => {
        res.render('paginas/cadastro/index', { municipios });
    },
    postCadastro: async (req, res) => {
        const anoAtual =  new Date().getFullYear();
        const nascimento = req.body.data_de_nascimento.substr(0,4)
        const nascInt = parseInt(nascimento);
        const idade = anoAtual - nascInt;
        const dadosPessoais = {
            CPF: req.body.CPF,
            Nome_completo: req.body.nome_completo,
            Nome_social: req.body.nome_social,
            Gênero: req.body.genero,
            Data_de_nascimento: req.body.data_de_nascimento,
            Idade: idade,
            Email: req.body.email,
            Telefone: req.body.fone,
            Município: req.body.municipio,
            Bairro: req.body.bairro,
            Data_de_cadastramento: dataDeCadastro()
        }
        const dadosAcademicos = {
            Grau: req.body.grau,
            Curso: req.body.curso,
            Instituição: req.body.instituicao,
            Data_início: req.body.data_inicial_academica,
            Data_término: req.body.data_final_academica
        }
        const dadosProfissionais = {
            Cargo: req.body.cargo,
            Empresa: req.body.empresa,
            Modalidade: req.body.modalidade,
            Data_início: req.body.data_inicial_experiencia,
            Data_término: req.body.data_inicial_experiencia
        }
        cadastraUsuario(req.body.email, req.body.senha, dadosPessoais, dadosAcademicos, dadosProfissionais).then(() => {
            res.redirect('/user/perfil');
        })
            .catch((error) => {
                const errorCode = error.code;
                let mensagemDeErro = verificaErro(errorCode);
                res.render('paginas/cadastro/index', { municipios, mensagemDeErro });
            });
    },


    getLogin: (req, res) => {
        res.render('paginas/login/index')
    },
    postLogin: (req, res) => {
        fazLogin(req.body.email, req.body.senha).then((userCredential) => {
            res.redirect('/user/perfil')
        })
            .catch((error) => {
                const errorCode = error.code;
                let mensagemDeErro = verificaErro(errorCode);
                res.render("paginas/login/index", { mensagemDeErro })
            });
    },


    getLogout: (req, res) => {
        logout().then(() => {
            res.redirect('/')
        })
    },


    getReauth: (req, res) => {
        res.render('paginas/login/reautenticacao');

    },
    postReauth: (req, res) => {
        resetPassword(req.body.email)
    },


    getPerfil: (req, res) => {
        const user_id = auth.currentUser.uid
        mostraCandidatura(user_id).then((candidatura) => {
            res.render('paginas/perfil/index', { candidatura })
        })
    },
    postPerfil: (req, res) => {
        const user_id = auth.currentUser.uid
        const vaga_id = req.body.vaga_id
        cancelaCandidatura(user_id, vaga_id).then(() => {
            res.redirect('/user/perfil')
        })
    },


    getEditPerfil: (req, res) => {
        res.render('paginas/perfil/edit', { municipios });
    },
    postEditPerfil: (req, res) => {
        var dados = {
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
            const mensagem = "Dados editados com sucesso"
            res.render('paginas/perfil/edit', { mensagem })
        })
            .catch((error) => {
                const errorCode = error.code;
                let mensagemDeErro = verificaErro(errorCode);
                res.render('paginas/perfil/edit', { municipios, mensagemDeErro });
            });
    }
}