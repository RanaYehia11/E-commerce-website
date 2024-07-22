let productsInfavourite = localStorage.getItem("productsInfavourite");
let productDom = document.querySelector('#productDom');
let noProducts = document.querySelector('.noProducts');

if (productsInfavourite) {
    let items = JSON.parse(productsInfavourite);
    drawfavProducts(items);
} else {
    displayNoProductsMessage();
}

function drawfavProducts(products) {
    if (products.length === 0) {
        displayNoProductsMessage();
    } else {
        let productsUI = products.map((item) => {
            return `
            <div class="product" id="product-${item.id}">
                <div class="productItem">
                    <img src="${item.imageurl}" class="productItemImg" alt="${item.title}">
                    <div class="productItemDesc">
                        <h2>${item.title}</h2>  
                        <p>Lorem ipsum dolor sit amet.</p>
                        <p>Size: ${item.size}</p>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: ${item.qty}</p>
                        <i class="fa-solid fa-trash" onclick="removeItem(${item.id})" style="cursor:pointer"></i>
                    </div>
                </div>
            </div>
            `;
        }).join('');
        productDom.innerHTML = `<div class="homecontainer">${productsUI}</div>`;
    }
}

function removeItem(id) {
    let productsInfavourite = localStorage.getItem("productsInfavourite");
    if (productsInfavourite) {
        let items = JSON.parse(productsInfavourite);
        let filteredItems = items.filter((item) => item.id !== id);
        localStorage.setItem("productsInfavourite", JSON.stringify(filteredItems));
        drawfavProducts(filteredItems);
    }
}
    

function displayNoProductsMessage() {
    noProducts.innerHTML = "There's no items !!!";
    noProducts.style.color = 'black';  
    noProducts.style.fontSize = '50px';  
    noProducts.style.fontWeight = 'bold'; 
    noProducts.style.position = 'absolute';
    noProducts.style.top = "50%"; 
    noProducts.style.left = "50%";
    noProducts.style.transform = "translate(-50%, -50%)";
    productDom.innerHTML = ""; // Clear the productDom content
}
