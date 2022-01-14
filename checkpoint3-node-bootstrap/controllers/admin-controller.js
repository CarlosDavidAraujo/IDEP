const { adicionaVaga, consultaTodasVagas } = require('../functions/Vaga');
const { serverTimestamp } = require('firebase/firestore')
module.exports = {
    getAdminVaga: (req, res) => {
        consultaTodasVagas().then((vaga) => {
        res.render('paginas/admin/index', {vaga});
        })
    },

    postAdminVaga: (req, res) => {
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
        if (req.files) {
            adicionaVaga(req.files.imgLogo.data, req.files.imgLogo.name, req.files.imgLogo.mimetype, dados_vaga)
        } else {
            adicionaVaga(null, null, null, dados_vaga)
        }
    }
}