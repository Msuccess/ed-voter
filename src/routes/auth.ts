import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { checkJwt } from '../middlewares/checkJwt';

const router = Router();
const authController = new AuthController();

//Change my password
router.post('/change-password', [checkJwt], authController.changePassword);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/', authController.getUser);
router.get('/:id', authController.getUserById);

export default router;
