const express = require('express');
const {getAdminVaga, postAdminVaga } = require('../controllers/admin-controller.js');

const router = express.Router();

router.get('/admin', getAdminVaga);
router.post('/admin', postAdminVaga);

module.exports = router;