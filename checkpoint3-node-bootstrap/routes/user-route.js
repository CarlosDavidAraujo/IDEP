<<<<<<< HEAD
//constações
const express = require('express');
const { getCadastro, postCadastro, getLogin, postLogin, getLogout, getReauth, postReauth, getPerfil, postPerfil, getEditPerfil, postEditPerfil } = require('../controllers/user-controller'); 
const { requireNoUser, requireUser } = require("../middlewares/autenticacao");
=======
//importações
import express from 'express';
import { getCadastro, postCadastro, getLogin, postLogin, getLogout, getReauth, postReauth, getPerfil, postPerfil, getEditPerfil, postEditPerfil } from '../controllers/user-controller.js'
import { requireNoUser, requireUser } from "../middlewares/autenticacao.js"
>>>>>>> 00eef85c7672fd56ab6c45e177e941100399a89e
const router = express.Router();

router.get('/cadastro', requireNoUser, getCadastro);
router.post('/cadastro', requireNoUser, postCadastro);

router.get('/login', requireNoUser, getLogin);
router.post('/login', requireNoUser, postLogin);

router.get('/logout', getLogout);

<<<<<<< HEAD
router.get('/reauth', requireNoUser, getReauth);
router.post('/reauth', requireNoUser, postReauth);
=======
router.get('/reauth', requireNoUser, getReauth)
router.post('/reauth', requireNoUser, postReauth)
>>>>>>> 00eef85c7672fd56ab6c45e177e941100399a89e

router.get('/perfil', requireUser, getPerfil);
router.post('/perfil', requireUser, postPerfil);

router.get('/perfil/edit', requireUser, getEditPerfil);
router.post('/perfil/edit', requireUser, postEditPerfil);


<<<<<<< HEAD
module.exports = router;
=======
export default router;
>>>>>>> 00eef85c7672fd56ab6c45e177e941100399a89e

