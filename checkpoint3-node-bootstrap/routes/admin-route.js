const express = require('express');
const {getAdminVaga, postAdminVaga, postAddVaga, postRemoveVaga, postEditaVaga, getAdminCurriculos, postAdminCurriculos, getAdminGraficos} = require('../controllers/admin-controller.js');
const { requireAdmin } = require('../middlewares/autenticacao.js');

const router = express.Router();

router.get('/admin/vagas', getAdminVaga);
router.post('/admin/vagas', postAdminVaga);

router.post('/admin/addVaga', postAddVaga);
router.post('/admin/removeVaga', postRemoveVaga);
router.post('/admin/editaVaga', postEditaVaga);

router.get('/admin/curriculos', getAdminCurriculos)
router.post('/admin/curriculos', postAdminCurriculos)


router.get('/admin/graficos', getAdminGraficos)


module.exports = router;