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

function calculaIdade(data) {
    const anoAtual = new Date().getFullYear();
    const nascimento = data.substr(0, 4)
    const nascInt = parseInt(nascimento);
    const idade = anoAtual - nascInt;
    return idade;
}

module.exports = {
    getCadastro: async (req, res) => {
        res.render('paginas/cadastro/index', { municipios });
    },
    postCadastro: async (req, res) => {
        const dados = {
            CPF: req.body.CPF,
            Nome_completo: req.body.nome_completo,
            Nome_social: req.body.nome_social,
            Gênero: req.body.genero,
            Data_de_nascimento: req.body.data_de_nascimento,
            Idade: calculaIdade(req.body.data_de_nascimento),
            Email: req.body.email,
            Telefone: req.body.fone,
            Município: req.body.municipio,
            Bairro: req.body.bairro,
            Data_de_cadastramento: dataDeCadastro(),
            img_perfil: null,
            Dados_academicos: {
                Grau: req.body.grau || null,
                Curso: req.body.curso,
                Instituição: req.body.instituicao,
                Data_início: req.body.data_inicial_academica,
                Data_término: req.body.data_final_academica
            },
            Dados_profissionais: {
                Cargo: req.body.cargo,
                Empresa: req.body.empresa,
                Modalidade: req.body.modalidade || null,
                Data_início: req.body.data_inicial_experiencia,
                Data_término: req.body.data_inicial_experiencia
            }
        }
        cadastraUsuario(req.body.email, req.body.senha, dados).then(() => {
            res.redirect('/user/perfil');
        })
            .catch((error) => {
                console.log(error)
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
            res.redirect('/user/login')
        })
    },

    postReauth: (req, res) => {
        resetPassword(req.body.emailReauth).then(()=>{
            let mensagemReauth = "Enviamos um email de recuperação de senha para o email informado."
            res.render("paginas/login/index", { mensagemReauth })
        }).catch((error) => {
            console.log(error)
            const errorCode = error.code;
            let reauthError = verificaErro(errorCode);
            res.render("paginas/login/index", { reauthError })
        });
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
        consultaDadosDoUsuario().then((doc) => {
            res.render('paginas/perfil/edit', { municipios, doc });
        });
    },
    postEditPerfil: (req, res) => {
        const dados = {
            CPF: req.body.CPF,
            Nome_completo: req.body.nome_completo,
            Nome_social: req.body.nome_social,
            Gênero: req.body.genero,
            Data_de_nascimento: req.body.data_de_nascimento,
            Idade: calculaIdade(req.body.data_de_nascimento),
            Email: req.body.email,
            Telefone: req.body.fone,
            Município: req.body.municipio,
            Bairro: req.body.bairro,
            Endereço: req.body.endereco,
            Dados_academicos: {
                Grau: req.body.grau || null,
                Curso: req.body.curso,
                Instituição: req.body.instituicao,
                Data_início: req.body.data_inicial_academica,
                Data_término: req.body.data_final_academica
            },
            Dados_profissionais: {
                Cargo: req.body.cargo,
                Empresa: req.body.empresa,
                Modalidade: req.body.modalidade || null,
                Data_início: req.body.data_inicial_experiencia,
                Data_término: req.body.data_inicial_experiencia
            }
        }
        if (req.files) {
            editaPerfil(req.body.email, dados, req.files.fotoPerfil).then(() => {
                const mensagem = "Dados editados com sucesso"
                consultaDadosDoUsuario().then((doc) => {
                    res.render('paginas/perfil/edit', { municipios, doc, mensagem })
                })
            })
                .catch((error) => {
                    console.log(error)
                    const errorCode = error.code;
                    let mensagemDeErro = verificaErro(errorCode);
                    res.render('paginas/perfil/edit', { municipios, mensagemDeErro });
                });
        }
        else {
            editaPerfil(req.body.email, dados, null).then(() => {
                const mensagem = "Dados editados com sucesso"
                consultaDadosDoUsuario().then((doc) => {
                    res.render('paginas/perfil/edit', { municipios, doc, mensagem })
                })
            })
                .catch((error) => {
                    console.log(error)
                    const errorCode = error.code;
                    let mensagemDeErro = verificaErro(errorCode);
                    res.render('paginas/perfil/edit', { municipios, mensagemDeErro });
                });
        }
    }
}