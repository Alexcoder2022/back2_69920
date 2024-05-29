import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import { __dirname } from './path.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io'


  
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

//ruta que apunta a la platilla de webSocket 
app.get("/realTimeProducts", (req, res)=>{
    res.render("realTimeProducts")
})



const PORT = 8081;

const httpServer = app.listen(PORT, ()=> console.log(`servidor ok en ${PORT}` ));

// instanciamos la clase server 
const socketServer = new Server (httpServer); 

socketServer.on('connection', (socket)=>{
    console.log(`nuevo cliente conectado ${socket.id}`)
})

