import { __dirname } from "../path.js";
import fs from 'fs';
import { v4 as uuidv4 } from "uuid";

import ProductsManager from "./productManager.js";
const productManager = new ProductsManager(`${__dirname}/data/products.json`); 


export default class CartManager {
    constructor(path){
        this.path = path
    }

    async getAllCarts(){
        try {
            if(fs.existsSync(this.path)){
                const carts = await fs.promises.readFile(this.path, "utf-8");
                const cartsJS = JSON.parse(carts);
                return cartsJS;
            }else return [];

        } catch (error) {
            console.log(error)
        }
    }

    //crear un nuevo carrito, cuando lo creamos viene vacio 

    async createCart(){
        try {
            const cart = {
                id: uuidv4(),
                products: [],
            }
            const carts = await this.getAllCarts();
            carts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return cart; 

        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(id){
        try {
            const carts = await this.getAllCarts();
            const cart = carts.find((c)=> c.id === id ); 
            if (!cart) return null ;
            
        } catch (error) {
            console.log (error)
            
        }
    }

    async saveProductToCart(idCart, idProduct) {
        try {
            const productExist = await productManager.getProductById(idProduct); 
            if(!productExist) throw new Error ('product not exist ');
            let carts = await this.getAllCarts();
            const cartExist = await this.getCartById(idCart); 
            if (!cartExist) throw new Error ('cart not found '); 
            const existProdInCart = cartExist.products.find((prod)=> prod.product === idProduct); 
            if(!existProdInCart){
                const prod = {
                    product : idProduct, 
                    quantity:1
                };
                cartExist.products.push(prod);

            }else existProdInCart.quantity += 1;
            const updateCarts = carts.map((cart)=>{
                if(cart.id === idCart)return cartExist
                return cart
            })
            await fs.promises.writeFile(this.path, JSON.stringify(updateCarts));
            return cartExist
        } catch (error) {
            
        }
    }


}