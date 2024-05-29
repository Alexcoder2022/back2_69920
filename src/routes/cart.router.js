import { Router } from "express";
import { middError } from "../middlewares/midd.error.js"; 
const router = Router();

import CartManager from "../managers/cartManager.js";


import { __dirname } from "../path.js";  //archivo path.js tiene el dirname 

const cartManager = new CartManager("./src/data/carts.json"); //preg??? la ruta para usar __dirname 


// agregar productos al array de productos 

router.post("/:idCart/products/:idProd", async (req, res, next)=>{
    try {
        const {idCart} = req.params;
        const {idProd} = req.params;
        const resp = await cartManager.saveProductToCart(idCart, idProd);
        res.json(resp);
        console.log(resp);

    } catch (error) {
        next(error); 
    }
});


//crear un carrito => funciona bien 
router.post("/", async (req,res)=>{
    try {
        res.json(await cartManager.createCart());

    }catch (error){
        res.status(500).json(error.message); 
        console.log(error);

    }


})

//buscar carrito por id, buscamos el id proporcinado con getCartById()
//funciona bien 

router.get ("/:idCart", async (req, res)=>{
    try {
        const { idCart } = req.params
        res.json(await cartManager.getCartById(idCart))
        
    } catch (error) {
        console.log(error); 
        
    }
});

export default router;