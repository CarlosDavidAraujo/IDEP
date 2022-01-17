const express = require('express');
const { getVagas, getHomeVagas, postHomeVagas, postVagas } = require('../controllers/vaga-controller');
const { requireUser} = require('../middlewares/autenticacao');

const router = express.Router();

router.get('/vaga', getVagas);
router.post('/vaga', postVagas);

router.get('/', getHomeVagas);
router.post('/', requireUser, postHomeVagas );

module.exports = router;

