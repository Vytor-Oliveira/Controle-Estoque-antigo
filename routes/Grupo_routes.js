import express from 'express';
import { createGroup, getAllGroups, getGroupById, updateGroup, deleteGroup } from '../controllers/grupoController.js';

const router = express.Router();

router.post('/', createGroup);
router.get('/', getAllGroups);
router.get('/:id', getGroupById);
router.put('/:id', updateGroup);
router.delete('/:id', deleteGroup);

export default router;
