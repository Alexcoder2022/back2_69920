import * as service from '../services/cart.services.js'

//crear un carrito =>  
export const create = async (req, res, next)=>{
    try {
        res.status(201).json(await service.create());

    }catch (error){
        next(error);
    }
}

export const getAll = async (req, res, next)=>{
   try {
      res.status(200).json(await service.getAll());
    }catch (error) {
        next(error);
    }
}

export const getById = async (req, res, next)=>{
    try {
      const { id } = req.params;
      const response = await service.getById(id);
      if (!response) res.status(404).json({ msg: "Cart Not found!" });
      else res.status(200).json(response);
    }catch (error) {
      next(error);
    }
}

export const update = async (req, res, next)=>{
    try {
        const { id } = req.params;
        const cartUpdate = await service.update(id, req.body);
        if (!cartUpdate) res.status(404).json({ msg: "Error update cart!" });
        else res.status(200).json(cartUpdate);
    } catch (error) {
        next(error);
    }
}
export const remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cartDel = await service.remove(id);
      if (!cartDel) res.status(404).json({ msg: "Error delete cart!" });
      else res.status(200).json({ msg: `Cart id: ${id} deleted` });
    } catch (error) {
      next(error.message);
    }
  };

  export const saveProductToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const newProdToCart = await service.saveProductToCart(idCart, idProd);
      if (!newProdToCart) res.json({ msg: "Error save product to cart" });
      else res.json(newProdToCart);
    } catch (error) {
      next(error.message);
    }
  };

  export const removeProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const delProdToCart = await service.removeProductToCart(
        idCart,
        idProd,
      );
      if (!delProdToCart) res.json({ msg: "Error remove product to cart" });
      else res.json({msg: `product ${idProd} deleted to cart`});
    } catch (error) {
      next(error.message);
    }
  };

  export const updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const { quantity } = req.body;
      const  updateProdQuantity = await service.updateProdQuantityToCart(idCart, idProd, quantity);
      if (!updateProdQuantity) res.json({ msg: "Error update product quantity to cart" });
      else res.json(updateProdQuantity);
    } catch (error) {
      next(error.message);
    }
  };

  export const clearCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const clearCart = await service.clearCart(idCart);
      if (!clearCart) res.json({ msg: "Error clear cart" });
      else res.json(clearCart);
    } catch (error) {
      next(error.message);
    }
  };



