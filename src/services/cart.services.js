
import CartDBManager from '../daos/cartDBManager.js';
const cartDao = new CartDBManager(); 

import ProductDBManager from '../daos/productDBManager.js'
const productDao = new ProductDBManager();



/* import {__dirname } from '../path.js';
import CartManager from '../daos/cartFSManager.js'

const cartDao = new CartManager(`${__dirname}/data/carts.json`); */


/* import ProductsManager from '../daos/productFSManager.js';
const productDao = new ProductsManager(`${__dirname}/data/products.json`); */




// la entrega no pide el get all en el carrito 
export const getAll = async () => {
    try {
        return await cartDao.getAll();
    } catch (error) {
        throw new Error(error);
    }
} 

export const getById = async (id) => {
    try {
        return await cartDao.getById(id); 
    } catch (error) {
        throw new Error(error);
    }
}

export const create = async () => {
    try {
        const newCart = await cartDao.create({products: []});
        if (!newCart) return false;
        else return newCart;
    } catch (error) {
        throw new Error(error);
    }
}
export const remove = async (id) => {
    try {
      const cartDel = await cartDao.delete(id);
      if (!cartDel) return false;
      else return cartDel;
    } catch (error) {
      console.log(error);
    }
  };

export const update = async (id, obj) => {
    try {
        return await cartDao.update(id, obj); 
    } catch (error) {
        throw new Error(error);
    }
} 

export const saveProductToCart = async (idCart, idProd) =>{
    try {
        const prodExist = await productDao.getById(idProd);  
        if(!prodExist) return null;

        const cartExist = await getById(idCart);
        if (!cartExist) return null;

        return await cartDao.saveProductToCart(idCart, idProd);
        

    } catch (error) {
        throw new Error(error);
    }

}

export const removeProductToCart = async (idCart, idProd) =>{
    try {
        const cartExist = await getById(idCart);
        if (!cartExist) return null;
        const existProdInCart = await cartDao.existProdInCart(idCart, idProd);
        console.log(existProdInCart);
        if (!existProdInCart) return null;
        return await cartDao.removeProductToCart(idCart, idProd);
    }catch (error){
        throw new Error(error);

    }    

}

export const updateProdQuantityToCart = async (idCart, idProd, quantity) => {
    try {
        const cartExist = await getById(idCart);
        if (!cartExist) return null;
        const existProdInCart = await cartDao.existProdInCart(idCart, idProd);
        if (!existProdInCart) return null;
        return await cartDao.updateProdQuantityToCart(idCart, idProd, quantity);
    } catch (error) {
        throw new Error(error);
    }
}
export const clearCart = async (idCart) => {
    try {
      const existCart = await getById(idCart);
      if (!existCart) return null;
      return await cartDao.clearCart(idCart);
    } catch (error) {
      console.log(error);
    }
  };



