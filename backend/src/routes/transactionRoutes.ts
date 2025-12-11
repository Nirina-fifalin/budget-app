import { Router } from 'express';
import { transactionController } from '../controllers/transactionController';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

router.post('/', transactionController.create);
router.get('/', transactionController.getAll);
router.get('/stats', transactionController.getStats);
router.get('/:id', transactionController.getById);
router.put('/:id', transactionController.update);
router.delete('/:id', transactionController.delete);

export default router;