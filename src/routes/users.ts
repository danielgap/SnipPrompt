import { Router } from 'express';
import {
  getAllUsers,
  deleteUser,
  promoteUser,
  demoteUser
} from '../controllers/users';
import { requireAuth, requireAdmin } from '../middleware';

const router = Router();

// Todas las rutas en este archivo requieren autenticación y privilegios de administrador.
router.use(requireAuth, requireAdmin);

router.route('/').get(getAllUsers);

router
  .route('/:id')
  .delete(deleteUser);

router.route('/:id/promote').put(promoteUser);
router.route('/:id/demote').put(demoteUser);

export default router; 