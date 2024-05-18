import { Router } from "express";
const router = Router();


import CartManager from "../managers/cartManager.js";
import { __dirname } from "../routes/path.js";  //archivo path.js tiene el dirname 

const cartManager = new CartManager("./src/data/carts.json"); //preg??? la ruta para usar __dirname 

router.post("/:idCart/product/:idProd", async (req, res, next)=>{
    try {
        
    } catch (error) {
        
    }
})


//crear un carrito 
router.post("/", async (req,res)=>{
    try {
        res.json(await cartManager.createCart());

    }catch (error){
        res.status(500).json(error.message); 
        console.log(error);

    }


})

router.get ("/:idCart", async (req, res)=>{
    try {
        const { idCart } = req.params
        res.json (await cartManager.getCartById(idCart))
        
    } catch (error) {
        console.log(error); 
        
    }
});

export default router;