

export default class ClaseBase {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            const documents = await this.model.find({});
            return documents;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const document = await this.model.findById(id);
            return document;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const newDocument = await this.model.create(obj);
            return newDocument;
        } catch (error) {
            console.log(error);
        }
    }

    async update(obj, id) {
        try {
            const document = await this.model.findByIdAndUpdate(id, obj, { new: true });
            return document;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const document = await this.model.findByIdAndDelete(id);
            return document;
        } catch (error) {
            console.log(error);
        }
    }
}

// en el productDBManager 

/* import { ProductModel } from './models/product.model.js';
import claseBase from './;

export default class ProductDBManager extends ClaseBase {
    constructor() {
        super(ProductModel); // Llama al constructor de la clase base  con ProductModel como argumento
    }
} */

// esto sirve para reutilizar el codigo, se crea una sola vez la clase padre (claseBase),
//y las clases hijas heredan estos métodos 