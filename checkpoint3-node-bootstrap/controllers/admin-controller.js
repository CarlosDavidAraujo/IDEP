const { adicionaVaga, consultaVagas } = require('../functions/Vaga');

module.exports = {
    getAdminVaga: (req, res) => {
        consultaVagas().then((vaga) => {
            res.render('paginas/admin/index', { vaga });
        })
    },

    postAdminVaga: (req, res) => {
        const dados_vaga = {
            Modalidade: req.body.modalidade,
            Cargo: req.body.cargo,
            Empresa: req.body.empresa,
            Detalhes: {
                Sobre_a_empresa: req.body.sobre_empresa,
                Sobre_a_vaga: req.body.sobre_vaga,
                Requisitos: req.body.requisitos,
                Vantagens: req.body.vantagens,
                Responsabilidades: req.body.responsabilidades,
                Remuneração_e_CH: req.body.remuneracao
            }
        }
        adicionaVaga(req.files.imgLogo.data, req.files.imgLogo.name, req.files.imgLogo.mimetype, dados_vaga)
    }
}