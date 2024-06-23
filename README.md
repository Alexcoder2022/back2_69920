✔️ ORDENAMIENTO ASCENDENTE Y DESCENDENTE     
localhost:8085/api/products?sort=asc
localhost:8085/api/products?sort=desc

✔️ BUSQUEDA POR CATEGORIA 
❗localhost:8085/api/products?category=Limpieza  
localhost:8085/api/products?category=Almacen 
localhost:8085/api/products?category=mascotas 

✔️ LIMIT 
localhost:8085/api/products?page=2category=Almacen&limit=1


CARTS
CREACIÓN DEL CARRITO 
✔️ POST : http://localhost:8085/api/carts

POST: 
AGREGAR UN PRODUCTO AL CARRITO:  router.post("/:idCart/products/:idProd", controllers.saveProductToCart);
✔️   http://localhost:8085/api/carts/667857c75b4e3131ada682f6/products/66773f6c2c997f443c70b75e

GET: 
TRAER TODOS LOS CARRITOS:  router.get ("/", controllers.getAll);
✔️   http://localhost:8085/api/carts
 
BUSCAR CARRITO POR ID:   router.get ("/:id", controllers.getById );
✔️   http://localhost:8085/api/carts/6671f2f8efbf6f5137ad8032
    
PUT: 
router.put("/:id", controllers.update);
❌  http://localhost:8085/api/carts/667857c75b4e3131ada682f6   

AGREGAR QUANTITY POR BODY: router.put("/:idCart/products/:idProd", controllers.updateProdQuantityToCart);
✔️  http://localhost:8085/api/carts/667857c75b4e3131ada682f6/products/66773f6c2c997f443c70b75e

DELETE:
BORRAR UN CARRITO : router.delete("/:id", controllers.remove);
✔️  http://localhost:8085/api/carts/6671e62e0231f5841b94a13e  

✔️  BORRAR UN PROD DEL CARRITO:  router.delete("/:idCart/products/:idProd", controllers.removeProdToCart); ❓ BORRA TODOS LOS PRODUCTOS 
http://localhost:8085/api/carts/667857c75b4e3131ada682f6/products/66773f6c2c997f443c70b75e


✔️  LIMPIAR EL CARRITO:   router.delete("/clear/:idCart", controllers.clearCart); //no func
http://localhost:8085/api/carts/clear/667857c75b4e3131ada682f6



idProd:66773f6c2c997f443c70b75e    alimento para perro

❗SOLUCION DE ERRORES:
<!-- http://localhost:8085/api/carts/667857c75b4e3131ada682f6 --> AL BUSCAR X ID 
error Error: MissingSchemaError: Schema hasn't been registered for model "products".
Use mongoose.model(name, schema)

 en productModel le agregue la products en vez de product
const productCollection = "products"; Y AHI SI ME DEVOLVIO EL CARRITO!!

❗ VER EL USO DE POPULATE CON EL MIDDLEWARE PRE... 