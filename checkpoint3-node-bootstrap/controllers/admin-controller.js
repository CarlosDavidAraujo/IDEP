const { adicionaVaga, consultaTodasVagas, removeVaga, editaVaga } = require('../functions/Vaga');
const { serverTimestamp } = require('firebase/firestore');
const { consultaTodosUsuarios } = require('../functions/User');
module.exports = {
    getAdminVaga: (req, res) => {
        consultaTodasVagas().then((vaga) => {
            consultaTodosUsuarios().then((users) => {
                  res.render('paginas/admin/index', { vaga, users });
            })
        })
    },

    postAddVaga: (req, res) => {
        const dados_vaga = {
            Modalidade: req.body.modalidade,
            Cargo: req.body.cargo,
            Empresa: req.body.empresa,
            Etapa: req.body.etapa,
            Data_de_criação: serverTimestamp(),
            Detalhes: {
                Sobre_a_empresa: req.body.sobre_empresa,
                Sobre_a_vaga: req.body.sobre_vaga,
                Requisitos: req.body.requisitos,
                Vantagens: req.body.vantagens,
                Responsabilidades: req.body.responsabilidades,
                Remuneração_e_CH: req.body.remuneracao
            }
        }
        console.log(req.files)
        if (req.files) {
            adicionaVaga(req.files.imgLogo.data, req.files.imgLogo.name, req.files.imgLogo.mimetype, dados_vaga).then(() => {
                res.redirect('/admin')
            })
        } else {
            adicionaVaga(null, null, null, dados_vaga).then(() => {
                res.redirect('/admin')
            })
        }
    },

    postRemoveVaga: (req, res) => {
        removeVaga(req.body.vaga_id).then(() => {
            res.redirect('/admin')
        })
    },

    postEditaVaga: (req, res) => {
        const dados_vaga = {
            Modalidade: req.body.modalidade,
            Cargo: req.body.cargo,
            Empresa: req.body.empresa,
            Etapa: req.body.etapa,
            Ultima_edição: serverTimestamp(),
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
            editaVaga(req.vaga_id, req.files.imgLogo.data, req.files.imgLogo.name, req.files.imgLogo.mimetype, dados_vaga).then(() => {
                res.redirect('/admin')
            })
        } else {
            editaVaga(req.body.vaga_id, null, null, null, dados_vaga).then(() => {
                res.redirect('/admin')
            })
        }
    }
}