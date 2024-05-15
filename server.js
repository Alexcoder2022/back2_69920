import express, { response } from 'express';
import ProductsManager from "./managers/productManager.js" //import la clase

const productManager = new ProductsManager("./products.json"); //instancia 

  
const app = express();

//middleware
app.use(express.json()); // para recibir datos json
app.use(express.urlencoded({extended: true})); //midd para datos q se envian x params 



//dos grupos de rutas: /products y /carts

//obtener los productos 
app.get ("/products", async(req, res)=>{
    try { 
        const products = await productManager.getproducts();
        res.status(200).json(products);    
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message); 
        
    }
});

//La ruta GET /:pid deberá traer sólo el producto con el id proporcionado

app.get ('/products/:pid', async (req, res)=>{
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(pid); 
        if(!product) res.status(404).json({msg: 'product not found'});
        else res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message); 
    }
});

//La ruta raíz POST / deberá agregar un nuevo producto
// obtener datos del producto 
app.post ("/products", async(req, res)=>{
    try {
        console.log(req.body); //Me llega un {}Vacio
        const product = await productManager.createproducts(req.body);
        if(!product) res.status(404).json({msg: 'product already exist!'}); //si dev null => dev prod exist
        else res.status(200).json(product);  
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message); 
    }
})

//La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body
app.put("/products/:pid", async(req, res)=>{
    try {
        const { pid } = req.params;
        const response = await productManager.updateProduct(req.body, pid); 
        if(!response) res.status(404).json({msg: "error updating product"});
        else res.status(200).json(response)
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
        
    }
})

//La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 
app.delete("/products/:pid", async(req, res)=>{
    try {
        const { pid } = req.params;
        const response = await productManager.deleteProduct(pid); 
        if(!response) res.status(404).json({msg: "Error delete product"});
        else res.status(200).json(response); 


    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
        
    }

});


const PORT = 8080;

app.listen(PORT, ()=> console.log(`servidor ok en ${PORT}` ));

