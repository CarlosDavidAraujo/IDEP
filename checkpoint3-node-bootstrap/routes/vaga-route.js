const express = require('express');
const { getVagas, getHomeVagas, postHomeVagas, postVagas, getParceiros } = require('../controllers/vaga-controller');
const { requireUser, requireNoAdmin} = require('../middlewares/autenticacao');

const router = express.Router();

router.get('/vaga', requireNoAdmin, getVagas);
router.post('/vaga', requireNoAdmin, postVagas);

router.get('/', requireNoAdmin, getHomeVagas);
router.post('/', requireUser, requireNoAdmin, postHomeVagas );

router.get('/parceiros', requireNoAdmin, getParceiros);

module.exports = router;

