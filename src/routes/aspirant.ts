import { Router } from 'express';
import { AspirantController } from '../controllers/AspirantController';

const router = Router();
const aspirantController = new AspirantController();

router.get('/', aspirantController.getAspirant);
router.get('/:id', aspirantController.getAspirantById);
router.post('/', aspirantController.createAspirant);
router.delete('/:', aspirantController.deleteAspirant);
router.put('/:id', aspirantController.updateAspirant);

export default router;
