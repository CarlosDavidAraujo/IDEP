const { candidataUsuarioParaVaga, auth } = require('../functions/User');
const { consultaVagasMaisRecentes, consultaTodasVagas, paginador } = require('../functions/Vaga');



module.exports = {
    getVagas: (req, res) => {
        consultaTodasVagas().then((vaga) => {
            const paginator = paginador(vaga, 1, 10)
            res.render('paginas/vaga/index', { paginator });
        });
    },

    postVagas: (req, res) => {
        consultaTodasVagas().then((vaga) => {
            const paginator = paginador(vaga, req.body.pagina, 10)
            res.render('paginas/vaga/index', { paginator });
        });
    },

    getHomeVagas: (req, res) => {
        consultaVagasMaisRecentes(3).then((vaga) => {
            res.render('paginas/home/index', { vaga });
        });
    },

    postHomeVagas: (req, res) => {
        const user_id = auth.currentUser.uid;
        candidataUsuarioParaVaga(req.body.vaga_id, user_id).then(() => {
            res.redirect('/user/perfil')
        })
    }
}

