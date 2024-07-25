import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import { __dirname } from './path.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import ProductsManager from './daos/productFSManager.js';
import { middError } from './middlewares/midd.error.js';
import { initMongoDB } from './db/database.js';  //conexion a la base Datos 
import userRouter from './routes/user.route.js'; 

import { generateToken, authToken } from './utils/jwt.js' // ver esta ruta 


initMongoDB();



const productManager = new ProductsManager("./src/data/products.json");


const app = express();

//middleware
app.use(express.json()); // para recibir datos json
app.use(express.urlencoded({extended: true})); //midd para datos q se envian x params 

app.use(express.static(`${__dirname}/public`)); //para archivos públicos 

//configuración de handlebars 
app.engine('handlebars', handlebars.engine()); //funcionalidad de handlebars 
app.set('views', `${__dirname}/views`); //ubicación de la carpeta para las vistas 
app.set('view engine', 'handlebars'); //seteamos el motor de plantilla a utilizar 
app.use('/', viewsRouter); //enrutador de vistas 

//prefijo /products, ingresa al arouter de products => en el rauter alcanza con poner /, si no se duplica 
app.use("/api/products", productsRouter); //routers 
app.use("/api/carts", cartRouter);
app.use("/user", userRouter);

/* app.post("/register", (req, res)=>{
    const { name, email, password } = req.body;
    if (!name || !email || !password ) {

    }
}) */
app.post("/api/register", (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    
    const exists = users.find((user) => user.email === email);
    
    if (exists) return res.status(400).json({ error: "User already exists" });
    
    const user = { name, email, password };
    
    // users.push(user);
    const accessToken = generateToken(user);
    
    res.json({ user, accessToken });
    });

app.use(middError); //siempre despues del enrutador 

//ruta que apunta a la plantilla de webSocket 
app.get("/realTimeProducts", (req, res)=>{
    res.render("realTimeProducts")
})



const PORT = 8085;

const httpServer = app.listen(PORT, ()=> console.log(`servidor ok en ${PORT}` ));

// instanciamos la clase server 
const socketServer = new Server (httpServer); 

socketServer.on('connection', async(socket)=>{
    console.log(`Nuevo cliente conectado ${socket.id}`);
    socketServer.emit('products', await productManager.getAll());

    socket.on('disconnect', ()=>{
     console.log(`Cliente desconectado`);
    })
    

    socket.on('newProduct', async(product)=>{
        try {
            await productManager.create(product)
            socketServer.emit('products', await productManager.getAll());
            
        } catch (error) {
            console.error(`error creating the product ${error.message}`)
        }
       
 
    }) 

    socket.on('deleteProduct',async(id)=>{
        try {
            await productManager.delete(id);
            socketServer.emit('products', await productManager.getAll());
        } catch (error) {
            console.error(`error deleting the product ${error.message}`)
        }
       
    })



})



