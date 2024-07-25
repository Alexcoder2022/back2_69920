import { UserModel } from "./models/user.model.js";

export default class UserDBManager {
    // buscar por nombre 

    async getUserByName(name){
        try {
            return await UserModel.findOne({first_name: name});
        } catch (error) {
            console.log(error);
            
        }
    }

    // buscar por email
    async getUserByEmail(email){
        try {
            return await UserModel.findOne({email});
        } catch (error) {
            console.log(error);
            
        }
    }

    async getUserById(id){
        try {
            return await UserModel.findById(id); //populate("cart");
        } catch (error) {
            console.log(error); 
        }
    }

    async getAll(page = 1, limit = 10){
        try {
            return await UserModel.paginate({}, {page, limit });
            
        } catch (error) {
            console.log(error); 
        }
    }

    async create(obj) {
        try {
            return await UserModel.create(obj);

        } catch (error) {
            throw new Error(error);
        }
    }
    async update(id, obj) {
        try {
            return await UserModel.findByIdAndUpdate(id, obj, { new: true });
            
            
        } catch (error) {
            console.log(error); 
        }
    }

    async delete(id) {
        try {
            return await UserModel.findByIdAndDelete(id);
            
        } catch (error) {
            console.log(error); 
        }
    }

    // asociar un usuario con un producto 
    async addProductToUser(userId, productId) {
        try {
            const user = await UserModel.findByIdAndUpdate(userId, 
                { $push: { cart: productId } },
                { new: true });
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    // eliminar un producto del carrito de un usuario
    async removeProductFromUser(userId, productId) {
        try {
            return await UserModel.findByIdAndUpdate(userId, { $pull: { cart: productId } }, { new: true });
            
        } catch (error) {
            throw new Error(error);
        }
    }
    // obtener el carrito de un usuario
    async getUserCart(userId) {
        try {
            const user = await UserModel.findById(userId).populate('cart');
            return user.cart;
        } catch (error) {
            throw new Error(error);
        }
    }
}