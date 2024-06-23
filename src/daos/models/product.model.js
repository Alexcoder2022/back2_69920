import mongoosePaginate from 'mongoose-paginate-v2';
import { Schema, model} from 'mongoose';


const productCollection = "products";

const productSchema = new Schema({
    title: { type: String, required:true},
    description: {type: String, required:true},
    code : {type: String, required:true},
    price: {type: Number, required:true},
    stock: {type: Number, required:true},
    category: {type: String, required:true},
    thumbnails: {type: Array, require: false, default: []} 
});
/* 

productSchema.pre("find", function() {
    this.populate("products");
}) */

productSchema.plugin(mongoosePaginate);

export const ProductModel = model(
    productCollection,
    productSchema
); 