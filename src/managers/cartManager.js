import { __dirname } from "../routes/path.js";
import fs from 'fs';
import { v4 as uuidv4 } from "uuid";

import ProductsManager from "./productManager.js"
const productManager = new ProductsManager("./src/data/products.json"); //mal usado el dirname 
console.log(`cartManager.js ${productManager}`);


export default class CartManager {
    constructor(path){
        this.path = path
    }

    async getAllCarts(){
        try {
            if(fs.existsSync(this.path)){
                const carts = await fs.promises.readFile(this.path, "utf-8");
                const cartsJS = JSON.parse(carts);
                console.log(cartsJS);
                return cartsJS;
            }else return [];

        } catch (error) {
            console.error('Error reading carts:', error);
            throw error;
        }
    }

    //crear un nuevo carrito, cuando lo creamos viene vacio 

    async createCart(){
        try {
            const cart = {
                id: uuidv4(),
                products: [],
            }
            const carts = await this.getAllCarts(); //traemos el array de carritos 
            carts.push(cart); //le agrego el CARRITO CREADO 
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return cart; //RETORNO EL CARRITO => siempre hay q retornar para que nos muestre 

        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(id){
        try {
            const carts = await this.getAllCarts();
            const cart = carts.find((c)=> c.id === id ); 
            if (!cart) return null ;
            return cart;
            console.log(cart);
        } catch (error) {
            console.log (error)
            
        }
    }

    //agregar un producto al carrito 
    // recibe id del carrito y id producto 
    async saveProductToCart(idCart, idProd) {
        try {
            const productExist = await productManager.getProductById(idProd); //ver si existe el prod 
            console.log(`productExist ${productExist}`); // por que me devuelve null ??????
            if(!productExist) throw new Error ('product not exist '); // si no exist arrojamos un error 
            let carts = await this.getAllCarts(); //traemos todos los carritos 
            
            const cartExist = await this.getCartById(idCart); //busco un carrito x id 
            if (!cartExist) throw new Error ('cart not found '); // si no existe  
            // ver si el producto existe dentro del carrito sumo la cantidad 
            
            const existProdInCart = cartExist.products.find((prod)=> prod.product === idProd); 
            if(!existProdInCart){ // si no existe en el carrito lo guardo 
                const prod = {
                    product : idProd, 
                    quantity:1
                };
                cartExist.products.push(prod); // al id del carrito le agrego el prodructo 
                

            }else existProdInCart.quantity += 1; // si el prod existe dentro del carrito le agrego 1 y lo actualizo
            const updateCarts = carts.map((cart)=>{ // recorro el array de carritos, 
                if(cart.id === idCart)return cartExist  // si el id carrito actual coincide con el id del actualizado devol el carrito actualizado
                return cart //si no coincide no se modifican 
            })
            await fs.promises.writeFile(this.path, JSON.stringify(updateCarts));
            return cartExist // retorno el carrito actualizado 
        } catch (error) {
            console.log(error); 
        }
    }


}