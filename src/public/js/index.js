//instanciamos webSocket
const socket = io();

const form = document.getElementById('form');
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputCode = document.getElementById('cede');
const inputPrice = document.getElementById('price');
const inputStock = document.getElementById('stock');
const inputCategory = document.getElementById('category');
const inputImage = document.getElementById('img');

const productsList = document.getElementById('products');

form.addEventListener("click",(e)=>{
    console.log("hizo click")
    e.preventDefault();
    const title =  inputTitle.value; 
    const description = inputDescription.value;
    const code= inputCode.value;
    const price = inputPrice.value;
    const stock = inputStock.value;
    const category = inputCategory.value;
    const image = inputImage.value;
    const product = {
        title,
        description,
        code,
        price,
        stock,
        category,

    }
       
    
    socket.emit('newProduct', product);
    form.reset();


})

form.onsubmit =(e)=>{
    e.preventDefault();
    //console.log(title.value, description.value, code.value, price.value, stock.value, category.value, image.value);
    const product = {
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        stock: stock.value,
        category: category.value,
        image: image.value
    }
    socket.emit('newProduct', product);
    form.reset();
}
socket.on('products', (products)=>{
    productsList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = product.title;
        productsList.appendChild(li);
    });
    
})



