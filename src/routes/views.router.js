//renderizamos las plantillas 
import express from 'express';  
import { __dirname } from '../path.js';
import { Router } from 'express'; 
const router = Router();

import ProductsManager from '../managers/productManager.js';
const managers = new ProductsManager(`${__dirname}/data/products.json`);

router.get("/", async(req, res)=>{
    const products = await managers.getproducts();
    console.log(products); 
    res.render('home', { products })  //nombre de la plantilla 

}); 

router.get("/realTimeProducts", (req, res)=>{
    res.render('realTimeProducts')
})


export default router