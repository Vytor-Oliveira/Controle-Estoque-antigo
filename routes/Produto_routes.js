import express from 'express';
import { createProduct, getAllProducts, getProdutoById, updateProduct, deleteProduct } from '../controllers/produtoController.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProdutoById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
