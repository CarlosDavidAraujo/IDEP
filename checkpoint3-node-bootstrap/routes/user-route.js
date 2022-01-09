//importações
import express from 'express';
import { getCadastro, postCadastro, getLogin, postLogin, getLogout, getReauth, postReauth, getPerfil, postPerfil, getEditPerfil, postEditPerfil } from '../controllers/user-controller.js'
import { requireNoUser, requireUser } from "../middlewares/autenticacao.js"
const router = express.Router();

router.get('/cadastro', requireNoUser, getCadastro);
router.post('/cadastro', requireNoUser, postCadastro);

router.get('/login', requireNoUser, getLogin);
router.post('/login', requireNoUser, postLogin);

router.get('/logout', getLogout);

router.get('/reauth', requireNoUser, getReauth)
router.post('/reauth', requireNoUser, postReauth)

router.get('/perfil', requireUser, getPerfil);
router.post('/perfil', requireUser, postPerfil);

router.get('/perfil/edit', requireUser, getEditPerfil);
router.post('/perfil/edit', requireUser, postEditPerfil);


export default router;

