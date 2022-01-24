const { adicionaVaga, consultaTodasVagas, removeVaga, editaVaga, paginador } = require('../functions/Vaga');
const { serverTimestamp } = require('firebase/firestore');
const { consultaTodosUsuarios, consultaGeneros, consultaIdades, filtraUsuarios } = require('../functions/User');
const axios = require('axios');

var municipios;
axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/23/municipios')
    .then(function (response) {
        municipios = response.data
    })


 let localidades =   [
        { name: 'Acaracuzinho' },
        { name: 'Alto Alegre I' },
        { name: 'Alto Alegre II' },
        { name: 'Alto da Mangueira' },
        { name: 'Antônio Justa' },
        { name: 'Boa Esperança' },
        { name: 'Boa Vista' },
        { name: 'Cágado' },
        { name: 'Coqueiral' },
        { name: 'Centro' },
        { name: 'Cidade Nova' },
        { name: 'Distrito Industrial I' },
        { name: 'Furna da Onça' },
        { name: 'Horto' },
        { name: 'Industrial' },
        { name: 'Jaçanaú' },
        { name: 'Jardim Bandeirantes' },
        { name: 'Jardim das Maravilhas' },
        { name: 'Jari' },
        { name: 'Jenipapeiro' },
        { name: 'Jereissati' },
        { name: 'Jatobá' },
        { name: 'Luzardo Viana' },
        { name: 'Menino Jesus de Praga' },
        { name: 'Mucunã' },
        { name: 'Novo Jenipapeiro' },
        { name: 'Novo Maracanaú' },
        { name: 'Novo Oriente' },
        { name: 'Olho D’Água' },
        { name: 'Pajuçara' },
        { name: 'Pajuçara Park' },
        { name: 'Pau-Serrado' },
        { name: 'Parque Tijuca' },
        { name: 'Parque Tropical' },
        { name: 'Parque Santa Maria' },
        { name: 'Piratininga' },
        { name: 'Santo Antônio' },
        { name: 'Santo Sátiro' },
        { name: 'Timbó' },
        { name: 'Vila Buriti' }
      ]

module.exports = {
    getAdminVaga: (req, res) => {
        const url = req.originalUrl;
        consultaTodasVagas().then((vaga) => {
            const paginator = paginador(vaga, 1, 10)
            res.render('paginas/admin/vagas', { localidades, municipios, paginator, url });
        });
    },
    postAdminVaga: (req, res) => {
        const url = req.originalUrl;
        consultaTodasVagas().then((vaga) => {
            const paginator = paginador(vaga, req.body.pagina, 10)
            res.render('paginas/admin/vagas', { localidades, municipios, paginator, url });
        });
    },

    postAddVaga: (req, res) => {
        const dados_vaga = {
            Modalidade: req.body.modalidade,
            Cargo: req.body.cargo,
            Empresa: req.body.empresa,
            Etapa: req.body.etapa,
            Localidade: req.body.localidade,
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
            Localidade: req.body.localidade || null,
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
        consultaTodasVagas().then((vagas) => {
            consultaTodosUsuarios().then((users) => {
                const paginator = paginador(users, 1, 10)
                res.render('paginas/admin/curriculos', { vagas, paginator, url, municipios })
            });
        });
    },

    postAdminCurriculos: (req, res) => {
        const url = req.originalUrl;
        if (!req.body.vaga) {
            consultaTodasVagas().then((vagas) => {
                consultaTodosUsuarios().then((users) => {
                    const paginator = paginador(users, req.body.pagina, 10)
                    res.render('paginas/admin/curriculos', { vagas, paginator, url, municipios })
                });
            });
        }
        else {
            consultaTodasVagas().then((vagas) => {
                filtraUsuarios('Candidaturas', 'array-contains', req.body.vaga).then((users) => {
                    const paginator = paginador(users, req.body.pagina, 100)
                    res.render('paginas/admin/curriculos', { vagas, paginator, url, municipios })
                });
            });
        }
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
