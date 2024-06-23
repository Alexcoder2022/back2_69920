import { Router } from "express";
import * as controllers from '../controllers/carts.controllers.js'

const router = Router();

import CartManager from "../daos/cartFSManager.js";
import { __dirname } from "../path.js";  
const cartManager = new CartManager("./src/data/carts.json"); 


router.post("/", controllers.create);

router.post("/:idCart/products/:idProd", controllers.saveProductToCart);

router.get ("/:id", controllers.getById );

router.get ("/", controllers.getAll);

router.put("/:id", controllers.update);

router.put("/:idCart/products/:idProd", controllers.updateProdQuantityToCart);

router.delete("/:id", controllers.remove);

router.delete("/:idCart/products/:idProd", controllers.removeProdToCart);

router.delete("/clear/:idCart", controllers.clearCart); 



export default router;