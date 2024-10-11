import express from 'express';
import { createUnidadeMedida, getAllUnidadesMedida } from '../controllers/unidadeMedidaController.js';

const router = express.Router();

router.post('/', createUnidadeMedida);
router.get('/', getAllUnidadesMedida);

export default router;
