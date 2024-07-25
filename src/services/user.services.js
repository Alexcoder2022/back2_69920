import UserDBManager from "../daos/user.dao.js";
const userDao = new UserDBManager();

import ProductDBManager from "../daos/productDBManager.js";
const productDao = new ProductDBManager();

import CartDBManager from "../daos/cartDBManager.js";
const cartDBManager = new CartDBManager();



export const getUserByName = async(name)=>{
    try {
        return await userDao.getUserByName(name);
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserById = async (id) => {
    try {
        return await userDao.getById(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserByEmail = async (email) => {
    try {
        return await userDao.getUserByEmail(email);
    } catch (error) {
        throw new Error(error);
    }
}



export const getAll = async (page, limit )=> {
    try {
        return await userDao.getAll(page, limit);
    } catch (error) {
        throw new Error(error);
    }
}

export const create = async (obj) => {
    try {
        const newUser = await userDao.create(obj);
        if (!newUser) throw new error ("validation error!")
        return newUser;

    } catch (error) {
        throw new Error(error);
    }
}

export const update = async (id, obj) =>{
    try {
        let user = await userDao.getUserById(id);
        if (!user) throw new Error ("User not found!");
        return  await userDao.update(id, obj)
    } catch (error) {
        throw new Error(error);
    }
}

export const remove = async (id) => {
    try {
        return await userDao.delete(id)
        
    } catch (error) {
       throw new Error(error); 
    }
}


export const addProductToUser = async (userId, productId)=>{
    try {
        const user = await userDao.getUserById(userId);
        if (!user) return null;
        
        const product = await productDao.getById(productId);
        if (!product) return null;

        return await userDao.addProductToUser(userId, productId);
       

    } catch (error) {
        throw new Error(error);
    }
}

export const removeProductFromUser = async (userId, productId)=>{
    try {
        const user = await userDao.getUserById(userId);
        if (!user) return null;
        
        const product = await productDao.getById(productId);
        if (!product) return null;
        
        return await userDao.removeProductFromUser(userId, productId);
        
    } catch (error) {
        throw new Error(error);
    }

}

export const getUserCart = async (userId)=>{
    try {
        const user = await userDao.getUserById(userId);
        if (!user) return null;
        
        return await userDao.getUserCart(userId);
        
    } catch (error) {
        throw new Error(error);
        
    }
}