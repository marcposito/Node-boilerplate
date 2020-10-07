import { Router } from 'express';
import controllers from '../controllers/example';

const router = Router();

router.route('/')
  .post(controllers.createExample);

router.route('/:id')
  .get(controllers.getExample)
  .put(controllers.updateExample)
  .delete(controllers.deleteExample);

export default router;
