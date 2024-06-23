
import {CartModel} from './models/cart.model.js';


export default class CartDBManager{

    async getAll() {
        try {
            return await CartModel.find({});
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        try {
            return await CartModel.findById(id). populate("products.product"); 
            // le agregamos el populate e ingresamos a products.product 
            // products: es el array y product es el id del producto
        
        } catch (error) {
            throw new Error(error);
        }
    } 

    async create() {
        try {
            return await CartModel.create({products:[]});
            
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id) {
        try {
            return await CartModel.findByIdAndDelete(id);
        
        } catch (error) {
            throw new Error(error);
        }
    }

    async existProdInCart(idCart, idProd){
        try {
          return await CartModel.findOne({
            _id: idCart,
            products: { $elemMatch: { product: idProd } }
          });
          // return await CartModel.findOne(
          //   { _id: cartId, 'products.product': prodId }
          // )
        } catch (error) {
          throw new Error(error);
        }
    }


    async removeProductToCart(idCart, idProd) {
        try {
          return await CartModel.findByIdAndUpdate(
            { _id: idCart },
            { $pull: { products: { product: idProd } } },
            { new: true }
          )
        } catch (error) {
          console.log(error);
        }
      }
    


    async saveProductToCart(idCart, idProd ){
        try {
        const existProdInCart = await this.existProdInCart(idCart, idProd);
        if(existProdInCart){
          return await CartModel.findOneAndUpdate(
            { _id: idCart, 'products.product': idProd },
            { $set: { 'products.$.quantity': existProdInCart.products[0].quantity + 1 } },
            { new: true }
          );
        } else {
          return await CartModel.findByIdAndUpdate(
            idCart,
            { $push: { products: { product: idProd } } },
            { new: true }
          )
        }
            
        } catch (error) {
            throw new Error(error);
        }
    } 




        async update(id, obj) {
            try {
                return await CartModel.findByIdAndUpdate(id, obj, {new: true});
                
            } catch (error) {
                throw new Error(error);
            }
        }

        async updateProdQuantityToCart(idCart, idProd, quantity) {
            try {
              return await CartModel.findOneAndUpdate(
                { _id: idCart, 'products.product': idProd },
                { $set: { 'products.$.quantity': quantity } },
                { new: true }
              );
            } catch (error) {
              console.log(error);
            }
        }

        async clearCart(idCart) {
            try {
             return await CartModel.findOneAndUpdate(
              { _id: idCart},
              { $set: { products: [] } },
              { new: true }
             )
            } catch (error) {
              console.log(error);
            }
          }





    
}

