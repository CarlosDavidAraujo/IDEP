import express  from 'express';
import { statusDoUsuario } from '../functions/User.js';
const router = express.Router();

//rotas:
//página principal   
router.get('/', (req, res) => {
    const isOn = statusDoUsuario();
    res.render('Paginas/Home/index', {isOn})
});

export default router;