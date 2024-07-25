import * as service from '../services/user.services.js';

export const getUserByName = async (req, res, next)=> {
    try {
        const { name } = req.query;
        const user = await service.getUserByName(name);
        if (!user) res.status(404).json({ msg: 'User not found' });
        else res.status(200).json(user);
    } catch (error) {
        next(error.message);
    } 
}

export const getUserById = async (req, res, next)=>{
    try {
        const { id } = req.params;
        const user = await service.getUserById(id);
        if (!user) res.status(404).json({ msg: 'User not found' });
        else res.status(200).json(user);
    } catch (error) {
        next(error.message);
    } 
}

export const getUserByEmail = async (req, res, next)=> {
    try {
        const { email } = req.query;
        console.log(email); 
        const user = await service.getUserByEmail(email);
        if (!user) res.status(404).json({ msg: 'Email not found' });
        else res.status(200).json(user);
    } catch (error) {
        next(error.message);
    }
}

export const getAll = async (req, res, next )=>{
    try {
        const { page, limit } = req.query
        const users = await service.getAll(page, limit );
        res.status(200).json(users);
    } catch (error) {
        next(error.message);
    }
}

export const create = async (req, res, next)=>{
    try {
        const user = await service.create(req.body);
        res.status(201).json(user);
        
    } catch (error) {
        next(error.message); 
    }
}

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userUpdate = await service.update(id, req.body);
        if (!userUpdate) res.status(404).json({ msg: 'User not found' });
        else res.status(200).json(userUpdate);
        
    } catch (error) {
        next(error.message); 
    }
}

export const remove = async (req, res, next) =>{
    try {
        const { id } = req.params;
        const userRemove = await service.remove(id);
        if (!userRemove) res.status(404).json({ msg: 'User not found' });
        else res.status(200).json(userRemove);

        
    } catch (error) {
        next(error.message);
    }

}
export const addProductToUser = async (req, res, next)=>{
    try {
        const { userId, productId } = req.params;
        const user = await service.addProductToUser(userId, productId);
        if (!user) res.status(404).json({ msg: 'User or product not found' });
        else res.status(200).json(user);
    } catch (error) {
        next(error.message);
    }

}

export const removeProductFromUser = async (req, res, next)=>{
    try {
        const { userId, productId } = req.params;
        const user = await service.removeProductFromUser(userId, productId);
        if (!user) res.status(404).json({ msg: 'User or product not found' });
        else res.status(200).json(user);
        
    } catch (error) {
        next(error.message);
    }
}

export const getUserCart = async (req, res, next) =>{
    try {
        const { userId } = req.params;
        const userCart = await service.getUserCart(userId);
        if (!userCart) res.status(404).json({ msg: 'User or cart not found' });
        else res.status(200).json(userCart);
        
    } catch (error) {
        next(error.message);
    }
}

