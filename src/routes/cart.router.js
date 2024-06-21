import { Router } from "express";
import * as controllers from '../controllers/carts.controllers.js'

const router = Router();

import CartManager from "../daos/cartFSManager.js";


import { __dirname } from "../path.js";  

const cartManager = new CartManager("./src/data/carts.json"); //preg??? la ruta para usar __dirname 


router.post("/:idCart/products/:idProd", controllers.update);

router.post("/", controllers.create); //Funciona Bien!

router.get ("/:id", controllers.getById );// funciona 

router.put("/:id", controllers.update);

router.delete("/:id", controllers.remove);//funciona 

router.delete("/:idCart/products/:idProd", controllers.removeProdToCart);

router.post("/:idCart/products/:idProd", controllers.saveProductToCart);

router.put("/:idCart/products/:idProd", controllers.updateProdQuantityToCart);

router.delete("/clear/:idCart", controllers.clearCart); //no func



export default router;