const { candidataUsuarioParaVaga, auth } = require('../functions/User');
const { consultaVagaMaisRecente, consultaTodasVagas } = require('../functions/Vaga');

module.exports = {
    getVagas: (req, res) => {
        consultaTodasVagas().then((vaga) => {
            res.render('paginas/vaga/index', { vaga });
        })
    },

    getHomeVagas: (req, res) => {
        consultaVagaMaisRecente().then((vaga) => {
            res.render('paginas/home/index', { vaga });
        })
    },

    postHomeVagas: (req, res) => {
        const user_id = auth.currentUser.uid;
        candidataUsuarioParaVaga(req.body.vaga_id, user_id).then(() => {
            res.redirect('/user/perfil')
        })
    }
}


