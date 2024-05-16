import express, { response } from 'express';
import productsRouter from './routes/products.router.js';


  
const app = express();

//middleware
app.use(express.json()); // para recibir datos json
app.use(express.urlencoded({extended: true})); //midd para datos q se envian x params 

//prefijo /products, ingresa al arouter de products => en el rauter alcanza con poner /, si no se duplica 
app.use("/products", productsRouter); //routers 
//app.use("/carts", cartsRouter);




const PORT = 8080;

app.listen(PORT, ()=> console.log(`servidor ok en ${PORT}` ));

