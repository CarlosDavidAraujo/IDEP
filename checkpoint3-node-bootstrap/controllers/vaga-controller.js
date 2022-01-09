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