//constações
const express = require('express');
const { getCadastro, postCadastro, getLogin, postLogin, getLogout, getReauth, postReauth, getPerfil, postPerfil, getEditPerfil, postEditPerfil } = require('../controllers/user-controller'); 
const { requireNoUser, requireUser } = require("../middlewares/autenticacao");
const router = express.Router();

router.get('/cadastro', requireNoUser, getCadastro);
router.post('/cadastro', requireNoUser, postCadastro);

router.get('/login', requireNoUser, getLogin);
router.post('/login', requireNoUser, postLogin);

router.get('/logout', getLogout);

router.get('/reauth', requireNoUser, getReauth);
router.post('/reauth', requireNoUser, postReauth);

router.get('/perfil', requireUser, getPerfil);
router.post('/perfil', requireUser, postPerfil);

router.get('/perfil/edit', requireUser, getEditPerfil);
router.post('/perfil/edit', requireUser, postEditPerfil);


module.exports = router;

