const express = require('express');
const {getAdminVaga, postAddVaga, postRemoveVaga, postEditaVaga } = require('../controllers/admin-controller.js');

const router = express.Router();

router.get('/admin', getAdminVaga);
router.post('/admin/addVaga', postAddVaga);
router.post('/admin/removeVaga', postRemoveVaga);
router.post('/admin/editaVaga', postEditaVaga);


module.exports = router;