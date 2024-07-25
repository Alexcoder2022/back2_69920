import { Router } from "express";
import * as controllers from '../controllers/user.controllers.js';

const router = Router();

router.get('/:name', controllers.getUserByName);

router.get('/', controllers.getAll);

router.get('/:id', controllers.getUserById);

router.get('/:email', controllers.getUserByEmail);



router.post('/', controllers.create);

router.put('/:id', controllers.update);

router.delete('/:id', controllers.remove);

router.post('/add/:userId/productId', controllers.addProductToUser);

router.delete('/:userId/productId', controllers.removeProductFromUser);


export default router




