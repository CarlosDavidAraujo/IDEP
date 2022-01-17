const { render } = require('express/lib/response');
const { candidataUsuarioParaVaga, auth } = require('../functions/User');
const { consultaVagasMaisRecentes, consultaTodasVagas, primeiraPagina, proximaPagina } = require('../functions/Vaga');

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

let ultimaVaga;

module.exports = {
    getVagas: (req, res) => {
        primeiraPagina(2).then((vagasVisiveis) => {
            const vaga = vagasVisiveis[0];
            ultimaVaga = vagasVisiveis[1]
            res.render('paginas/vaga/index', { vaga })
        });
    },

    postVagas: (req, res) => {
        proximaPagina(ultimaVaga, 2).then((vagasVisiveis) => {
            const vaga = vagasVisiveis[0];
            ultimaVaga = vagasVisiveis[1]
            res.render('paginas/vaga/index', { vaga })
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

