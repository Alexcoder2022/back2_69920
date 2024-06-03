//instanciamos webSocket
const socket = io();

const form = document.getElementById('form');
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputCode = document.getElementById('code');
const inputPrice = document.getElementById('price');
const inputStock = document.getElementById('stock');
const inputCategory = document.getElementById('category');

const productsList = document.getElementById('products');

form.onsubmit = (e)=>{
    console.log("hizo click")
    e.preventDefault();
    const title =  inputTitle.value; 
    const description = inputDescription.value;
    const code= inputCode.value;
    const price = inputPrice.value;
    const stock = inputStock.value;
    const category = inputCategory.value;
    
    const product = {
        title,
        description,
        code,
        price,
        stock,
        category,
    };
    console.log(product);
    socket.emit('newProduct', product);
    form.reset();
    
    
}

socket.on('products', (products)=>{
   let infoProducts  = ""; 
   products.forEach((prod)=>{
    infoProducts += `<div class="card" style="width: 18rem;">
    
        <div class="card-body">
        <p class="card-title">${prod.id}<p>
        <h5 class="card-title">${prod.title}</h5>
        <p class="card-text">DESCRIPCIÓN: ${prod.description}</p>
        <p class="card-text"> CÓDIGO: ${prod.code}</p>
        <p class="card-text">ESTADO: ${prod.status}</p> 
        <p class="card-text">STOCK: ${prod.stock}</p>
        <p class="card-text">CATEGORIA: ${prod.category}</p>
        <h5 class="card-text"> PRECIO: $ ${prod.price}</h5>
        

        <button type="button" class="btn btn-danger" >ELIMINAR</button>
        </div>
    </div>`;
   

   });
   productsList.innerHTML = infoProducts;

   const btnsEliminar = document.querySelectorAll('.btn-danger');
    btnsEliminar.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const id = e.target.parentElement.children[0].innerText;
            socket.emit('deleteProduct', id);
            console.log('id de prod index ', id);
        });
    
   })
})




