<<<<<<< HEAD
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


=======
import { candidataUsuarioParaVaga, auth } from '../functions/User.js';
import consultaVagas from '../functions/Vaga.js';

export const getHomeVagas = (req, res) => {
    const backgroundImg = "bg-img"
    consultaVagas().then((vaga) => {
        res.render('Paginas/Home/index', { vaga, backgroundImg });
    })
}

export const postHomeVagas = (req, res) => {
    const user_id = auth.currentUser.uid;
    candidataUsuarioParaVaga(req.body.vaga_id, user_id).then(() => {
        res.redirect('/user/perfil')
    })
}
>>>>>>> 00eef85c7672fd56ab6c45e177e941100399a89e
