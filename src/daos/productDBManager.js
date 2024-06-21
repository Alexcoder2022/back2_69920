//import el modelo y llamo a c/u de los métodos 
import { ProductModel } from './models/product.model.js'; 

export default class ProductDBManager{

    async getAll() {
        try {
            const documents = await ProductModel.find({});
            return documents;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getById(id) {
        try {
            const document = await ProductModel.findById(id);
            return document;
        } catch (error) {
            throw new Error(error);
        }
    }
    async create(obj) {
        try {
            const newdocument = await ProductModel.create(obj);
            return newdocument;
        } catch (error) {
            throw new Error(error);
        }
    }
    async update(obj, id) {
        try {
            const document = await ProductModel.findByIdAndUpdate(id, obj, { new: true }); //new:true para q lo actua
            return document;
        } catch (error) {
            throw new Error(error);
        }
    }
    async delete(id) {
        try {
            const document = await ProductModel.findByIdAndDelete(id);
            return document;
        } catch (error) {
            throw new Error(error);
        }
    }

}; 

