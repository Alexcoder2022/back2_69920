import CartManager from "../managers/cartManager.js";
import { __dirname } from "./path.js";

const cartManager = new CartManager(`${__dirname}/data/carts.json`);

router.post("/:idCart/product/:idProd", async (req, res, next)=>{
    try {
        
    } catch (error) {
        
    }
})

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
})