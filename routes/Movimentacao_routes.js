import express from 'express';
import { createMovimentacao, getMovimentacoes, getMovimentacaoById } from '../controllers/movimentacaoController.js';

const router = express.Router();

router.post('/', createMovimentacao);
router.get('/', getMovimentacoes);
router.get('/:id', getMovimentacaoById);

export default router;
