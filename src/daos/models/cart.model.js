import { Schema, model} from 'mongoose';

const cartCollection = "cart";

export const cartSchema = new Schema({
    products: [
      {_id: false, 
        quantity: {type: Number, default: 1 },
        product: {
          type: Schema.Types.ObjectId,
          ref: "products" // Referencia al modelo de productos
        }
      }
    ]
  });

export const CartModel = model("cart", cartSchema);