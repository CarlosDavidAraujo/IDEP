const { adicionaVaga, consultaTodasVagas, removeVaga, editaVaga, paginador } = require('../functions/Vaga');
const { serverTimestamp } = require('firebase/firestore');
const { consultaTodosUsuarios, consultaGeneros, consultaIdades } = require('../functions/User');
const axios = require('axios');

var municipios;
axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/23/municipios')
    .then(function (response) {
        municipios = response.data
    })

module.exports = {
    getAdminVaga: (req, res) => {
        const url = req.originalUrl;
        consultaTodasVagas().then((vaga) => {
            const paginator = paginador(vaga, 1, 10)
            res.render('paginas/admin/vagas', { municipios, paginator, url });
        });
    },
    postAdminVaga: (req, res) => {
        const url = req.originalUrl;
        consultaTodasVagas().then((vaga) => {
            const paginator = paginador(vaga, req.body.pagina, 10)
            res.render('paginas/admin/vagas', { municipios, paginator, url });
        });
    },

    postAddVaga: (req, res) => {
        const dados_vaga = {
            Modalidade: req.body.modalidade,
            Cargo: req.body.cargo,
            Empresa: req.body.empresa,
            Etapa: req.body.etapa,
            Ultima_modificação: serverTimestamp(),
            Detalhes: {
                Sobre_a_empresa: req.body.sobre_empresa,
                Sobre_a_vaga: req.body.sobre_vaga,
                Requisitos: req.body.requisitos,
                Vantagens: req.body.vantagens,
                Responsabilidades: req.body.responsabilidades,
                Remuneração_e_CH: req.body.remuneracao
            }
        }
        if (req.files) {
            adicionaVaga(req.files.imgLogo, dados_vaga).then(() => {
                res.redirect('/admin/vagas')
            });
        } else {
            adicionaVaga(null, dados_vaga).then((doc) => {
                res.redirect('/admin/vagas')
            })
        }
    },

    postRemoveVaga: (req, res) => {
        removeVaga(req.body.vaga_id).then(() => {
            res.redirect('/admin/vagas')
        })
    },

    postEditaVaga: (req, res) => {
        const dados_vaga = {
            Modalidade: req.body.modalidade,
            Cargo: req.body.cargo,
            Empresa: req.body.empresa,
            Etapa: req.body.etapa,
            Ultima_modificação: serverTimestamp(),
            Detalhes: {
                Sobre_a_empresa: req.body.sobre_empresa,
                Sobre_a_vaga: req.body.sobre_vaga,
                Requisitos: req.body.requisitos,
                Vantagens: req.body.vantagens,
                Responsabilidades: req.body.responsabilidades,
                Remuneração_e_CH: req.body.remuneracao
            }
        }
        if (req.files) {
            editaVaga(req.body.vaga_id, req.files.changedLogo, dados_vaga).then(() => {
                res.redirect('/admin/vagas')
            });
        } else {
            editaVaga(req.body.vaga_id, null, dados_vaga).then(() => {
                res.redirect('/admin/vagas')
            });
        }
    },

    getAdminCurriculos: (req, res) => {
        const url = req.originalUrl;
        consultaTodosUsuarios().then((users) => {
            const paginator = paginador(users, 1, 3)
            res.render('paginas/admin/curriculos', { paginator, url, municipios })
        });
    },

    postAdminCurriculos: (req, res) => {
        const url = req.originalUrl;
        consultaTodosUsuarios().then((users) => {
            const paginator = paginador(users, req.body.pagina, 3)
            res.render('paginas/admin/curriculos', { paginator, url, municipios })
        });
    },

    getAdminGraficos: (req, res) => {
        const url = req.originalUrl;
        consultaIdades().then((valorPorIdade) => {
            consultaGeneros().then((resultado) => {
                res.render('paginas/admin/graficos', { resultado, url, valorPorIdade })
            });
        });
    }
}
