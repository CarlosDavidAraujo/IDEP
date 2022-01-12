const { candidataUsuarioParaVaga, auth } = require('../functions/User');
const { consultaVagas } = require('../functions/Vaga');

module.exports = {
    getVagas: (req, res) => {
        consultaVagas().then((vaga) => {
            res.render('paginas/vaga/index', { vaga });
        })
    },

    getHomeVagas: (req, res) => {
        const backgroundImg = "bg-img"
        consultaVagas().then((vaga) => {
            res.render('paginas/home/index', { vaga, backgroundImg });
        })
    },

    postHomeVagas: (req, res) => {
        const user_id = auth.currentUser.uid;
        candidataUsuarioParaVaga(req.body.vaga_id, user_id).then(() => {
            res.redirect('/user/perfil')
        })
    }
}


