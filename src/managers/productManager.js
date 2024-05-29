import fs from 'fs';
import { v4 as uuidv4 } from "uuid";



export default class ProductsManager{
    constructor(path){
        this.path = path;
    }

    async getproducts(limit){
        try{//verificamos si existe el path
            //console.log(this.path); 
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, "utf-8"); //si existe lo leo
                const productsJS = JSON.parse(products) // lo parseo y lo retorno
                if(limit) return productsJS.slice(0, limit);  //retorna el limit 
                return productsJS
                
            }else return []; //si no exist retorno un array vacio
        }catch (error){
            console.log(error); 
        }
    }

    //crear los productos 
    async createproducts(obj){   // no me genera el id ??????????
        try{
            const product = {
                id: uuidv4(),
                status: true,
                ...obj,
            };
            const productsFile = await this.getproducts();
            const productExist = productsFile.find((p) => p.id === product.id);
            //const productExist = productsFile.find((p)=>p.title === product.title ); //ver el find 
            console.log(productExist);
            if(productExist) return null;
            productsFile.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
            return product;
        }catch (error){
            console.log(error); 
        }

    }

    async getProductById(id){
        try {
            const products = await this.getproducts();
            const productExist = products.find((p)=>p.id === id);
            if(!productExist) return null;
            return productExist;

        } catch (error) {
            console.log(error); 
        }
    }

    async updateProduct(obj, id){
        try {
            const productsFile = await this.getproducts();
            let productExist = await this.getProductById(id);
            if(!productExist) return null;
            productExist = {...productExist, ...obj}; 
            const newArray = productsFile.filter((p)=> p.id !== id);//sacamos el producto q encontramos y generamos newAR
             newArray.push(productExist); //le pusheo el produc nuevo
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return productExist;
        } catch (error) {
            console.log(error); 
        }
    }

    async deleteProduct(id){
        try {
            const products = await this.getproducts();
            if(products.length > 0){
                const productExist = await this.getProductById(id);
                if(productExist){
                    const newArray = products.filter((p)=> p.id !== id);
                    await fs.promises.writeFile(this.path, JSON.stringify(newArray));
                    return productExist // retorna el producto borrado 
                }
            }else return null;    
        } catch (error) {
            console.log(error); 
        }
        
    }


}
