//importamos todos los servicios y desde los controlers llamamos al servicio y vamos a manejar lo que nos llega y la rta que enviamos 

import * as service from '../services/product.services.js'; 

export const getAll = async(req, res,next)=>{
    try { 
        const { limit } = req.query;
        const products = await service.getAll(limit);
        res.status(200).json(products);    
    } catch (error) {
        next(error);
    }
}


export const getById = async (req, res, next)=>{
    try {
        const { pid } = req.params;
        const product = await service.getById(pid); 
        if(!product) res.status(404).json({msg: 'product not found'});
        else res.status(200).json(product)
    } catch (error) {
        next(error); 
    }
}

export const create = async (req, res, next)=>{
    try {
        console.log(req.body); 
        const product = await service.create(req.body);
        if(!product) res.status(404).json({msg: 'product already exist!'}); //si dev null => dev prod exist
        else res.status(201).json(product);  
    } catch (error) {
        next(error);
    }
}

export const update = async(req, res, next)=>{
    try {
        const { pid } = req.params;
        const { title, description, code, price, stock, category} = req.body;
        const response = await service.update(req.body, pid); 
        if(!response) res.status(404).json({msg: "error updating product"});
        else res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export const remove =  async(req, res, next)=>{
    try {
        const { pid } = req.params;
        const response = await service.remove(pid); 
        if(!response) res.status(404).json({msg: "Error delete product"});
        else res.status(200).json(response); 
    } catch (error) {
        next(error);
    }
}