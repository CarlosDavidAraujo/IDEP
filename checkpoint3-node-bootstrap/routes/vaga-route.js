<<<<<<< HEAD
const express = require('express');
const { getVagas, getHomeVagas, postHomeVagas } = require('../controllers/vaga-controller');
const { requireUser} = require('../middlewares/autenticacao');

const router = express.Router();

router.get('/vaga', getVagas);
=======
import express from 'express';
import { getHomeVagas, postHomeVagas } from '../controllers/vaga-controller.js';
import { requireUser} from '../middlewares/autenticacao.js';
const router = express.Router();

>>>>>>> 00eef85c7672fd56ab6c45e177e941100399a89e

router.get('/', getHomeVagas);
router.post('/', requireUser, postHomeVagas );

<<<<<<< HEAD

module.exports = router;
=======
export default router;
>>>>>>> 00eef85c7672fd56ab6c45e177e941100399a89e
