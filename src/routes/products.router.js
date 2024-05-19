import { Router } from "express";
import { productValidator } from "../middlewares/productValidator.js";
const router = Router();

import ProductsManager from "../managers/productManager.js" //import la clase
const productManager = new ProductsManager("./src/data/products.json"); //instancia


// reemplazo todos los app x router
//dos grupos de rutas: /products y /carts

//obtener los productos 
router.get ("/", async(req, res)=>{
    try { 
        const { limit } = req.query;
        const products = await productManager.getproducts(limit);
        res.status(200).json(products);    
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message});
        
    }
});

//La ruta GET /:pid deberá traer sólo el producto con el id proporcionado

router.get ('/:pid', async (req, res)=>{
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(pid); 
        if(!product) res.status(404).json({msg: 'product not found'});
        else res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message});
    }
});

//La ruta raíz POST / deberá agregar un nuevo producto
// obtener datos del producto 
router.post ("/", productValidator, async(req, res)=>{
    try {
        console.log(req.body); //Me llega un {}Vacio
        const product = await productManager.createproducts(req.body);
        if(!product) res.status(404).json({msg: 'product already exist!'}); //si dev null => dev prod exist
        else res.status(200).json(product);  
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message});
    }
})

//La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body
router.put("/:pid", async(req, res)=>{
    try {
        const { pid } = req.params;
        const response = await productManager.updateProduct(req.body, pid); 
        if(!response) res.status(404).json({msg: "error updating product"});
        else res.status(200).json(response)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message});
        
    }
})

//La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 
router.delete("/:pid", async(req, res)=>{
    try {
        const { pid } = req.params;
        const response = await productManager.deleteProduct(pid); 
        if(!response) res.status(404).json({msg: "Error delete product"});
        else res.status(200).json(response); 


    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message});
        
    }

});

export default router;
