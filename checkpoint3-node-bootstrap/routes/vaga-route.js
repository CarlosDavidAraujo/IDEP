import express from 'express';
import { getHomeVagas, postHomeVagas } from '../controllers/vaga-controller.js';
import { requireUser} from '../middlewares/autenticacao.js';
const router = express.Router();


router.get('/', getHomeVagas);
router.post('/', requireUser, postHomeVagas );

export default router;