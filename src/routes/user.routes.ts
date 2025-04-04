import { UserController } from '../controllers';
import { Router } from 'express';
import { validateJWT, checkRole } from '../middlewares';

const userController = new UserController();
const userRouter = Router();

userRouter.use(validateJWT());

userRouter.get('/', checkRole('admin'), userController.getAll);
userRouter.get('/me', userController.getMe);
userRouter.get('/:id', checkRole('admin'), userController.getUserById);
// userRouter.get('/user/:params', userController.getUser);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', checkRole('admin'), userController.deleteUser);
userRouter.post('/profile', checkRole('artist', 'admin'), userController.addProfile);
userRouter.patch('/profile', checkRole('artist', 'admin'), userController.updateProfile);


export default userRouter;
