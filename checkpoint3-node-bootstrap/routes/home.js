import express from 'express';
import { statusDoUsuario, candidataUsuarioParaVaga, auth } from '../functions/User.js';
import consultaVagas from '../functions/Vaga.js';
const router = express.Router();

//rotas:
//página principal   
router.get('/', (req, res) => {
    const online = statusDoUsuario();
    consultaVagas().then((vaga) => {
        res.render('Paginas/Home/index', { online, vaga });
    })
});

router.post('/', (req, res) => {
    const online = statusDoUsuario();
    if (online) {
        const user_id = auth.currentUser.uid;
        candidataUsuarioParaVaga(req.body.vaga_id, user_id).then(()=> {
            res.redirect('/perfil')
        })
     }
    else {
        res.redirect('/login')
    }
});
export default router;