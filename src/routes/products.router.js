import { Router } from "express";
import * as controllers from "../controllers/products.controllers.js"; 
import { productValidator } from "../middlewares/productValidator.js";
//import { middError } from "../middlewares/midd.error.js";
const router = Router();

import ProductsManager from "../daos/productFSManager.js" //import la clase
//import { idValidator } from "../middlewares/id.validator.js";
const productManager = new ProductsManager("./src/data/products.json"); //instancia



router.get ("/", controllers.getAll); 

router.get ('/:pid', controllers.getById); 

router.post ("/", productValidator, controllers.create);

router.put("/:pid",productValidator, controllers.update);

router.delete("/:pid", controllers.remove); 


export default router;
