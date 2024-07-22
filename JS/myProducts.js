// Variables
let products = JSON.parse(localStorage.getItem('products')) || [];
let productDom = document.getElementById('productDom'); // Use getElementById
let noProducts = document.querySelector('.noProducts');

// Display products
function drawProducts(products = []) {
    let myProducts = products.filter(item => item.isMe === "true");

    if (myProducts.length > 0) {
        let productsUI = myProducts.map((item) => {
            return `
                <div class="product" id="product-${item.id}">
                    <div class="productItem">
                        <img src="${item.imageurl}" class="productItemImg" alt="${item.title}">
                        <div class="productItemDesc">
                            <a onclick='saveItemData(${item.id})'>${item.title}</a>  
                            <p>Lorem ipsum dolor sit amet.</p>
                            <p>Size: ${item.size}</p>
                            ${item.price ? `<p>Price: ${item.price}</p>` : ''}
                            <i class="fa-solid fa-trash" onclick="deleteProduct(${item.id})" style="cursor:pointer"></i>
                            <button class='editProduct' onclick='editProduct(${item.id})'>Edit Product</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        productDom.innerHTML = `<div class="homecontainer">${productsUI}</div>`;
        noProducts.innerHTML = ""; // Clear the "No Products" message
    } else {
        displayNoProductsMessage();
    }
}

// Display "No Products" message
function displayNoProductsMessage() {
    noProducts.innerHTML = "No Products Here !!!";
    noProducts.style.color = 'black';
    noProducts.style.fontSize = '50px';
    noProducts.style.fontWeight = 'bold';
    noProducts.style.position = 'absolute';
    noProducts.style.top = "50%";
    noProducts.style.left = "50%";
    noProducts.style.transform = "translate(-50%, -50%)";
    productDom.innerHTML = ""; // Clear the productDom content
}

// Load products from localStorage and display them
let storedProducts = localStorage.getItem('products');
if (storedProducts) {
    drawProducts(JSON.parse(storedProducts));
} else {
    drawProducts([]); // In case there are no products in localStorage
}

// Edit products function
function editProduct(id) {
    localStorage.setItem("editProduct", id);
    window.location = "editProduct.html";
}

// Delete product function
function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    // Filter out the product to be deleted
    let updatedProducts = products.filter((item) => item.id !== id);
    // Update localStorage with the new list of products
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    // Update the display
    drawProducts(updatedProducts);
}
