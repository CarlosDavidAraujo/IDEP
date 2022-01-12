const express = require('express');
const { getVagas, getHomeVagas, postHomeVagas } = require('../controllers/vaga-controller');
const { requireUser} = require('../middlewares/autenticacao');

const router = express.Router();

router.get('/vaga', getVagas);

router.get('/', getHomeVagas);
router.post('/', requireUser, postHomeVagas );

module.exports = router;

