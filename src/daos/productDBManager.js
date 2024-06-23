//import el modelo y llamo a c/u de los métodos 
import { ProductModel } from './models/product.model.js'; 

export default class ProductDBManager{

    async getAll(page = 1, limit= 5, category, sort ) {
        try {
            const filter = category ? { 'category': category } : {}; 
           
            let sortOrder = {}; 
            if(sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null; 
            const documents = await ProductModel.paginate(filter, {page, limit, sort: sortOrder});
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

