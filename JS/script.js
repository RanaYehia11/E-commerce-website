document.addEventListener('DOMContentLoaded', function() {
    let getLang = localStorage.getItem('langDir');
    if (getLang) {
        changeDir(getLang);
    }

    let userinfo = document.querySelector('#userinfo');
    let userDom = document.querySelector('#user');
    let links = document.querySelector('#links');
    let logout = document.querySelector('#logout');

    let userName = localStorage.getItem("userName");
    if (userName) {
        if (links) {  // Check if links exists
            links.remove();
        }
        userinfo.style.display = "flex";
        userDom.innerHTML = userName;
    }

    logout.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.clear();
        setTimeout(() => {
            window.location = 'register.html';
        });
    });

    // Define Products
    let cartProducts = document.querySelector('.cartProducts div');
    let cartProductsMenu = document.querySelector('.cartProducts');
    let badge = document.querySelector('.badge');
    let shoppingCart = document.querySelector('.shoppingCart');

    let products = JSON.parse(localStorage.getItem('products')) || [
        { id: 1, title: "i-Phone15", size: "Small", price: "999$", imageurl: 'images/iphone.jpeg', qty: 1, isMe: "false" },
        { id: 2, title: "Sun Glasses", size: "Large", price: "1200$", imageurl: 'images/proxy-image (8).jpeg', qty: 1, isMe: "false" },
        { id: 3, title: "TV", size: "Medium", price: "400$", imageurl: 'images/tv.webp', qty: 1, isMe: "false" },
        { id: 4, title: "Laptop", size: "Large", price: "2000$", imageurl: 'images/laptopp.webp', qty: 1, isMe: "false" },
        { id: 5, title: "Watch", size: "Large", price: "1200$", imageurl: 'images/proxy-image (1).jpeg', qty: 1, isMe: "false" },
        { id: 6, title: "Headphone", size: "Medium", price: "200$", imageurl: 'images/proxy-image.png', qty: 1, isMe: "false" }
    ];

    localStorage.setItem('products', JSON.stringify(products));

    shoppingCart.addEventListener('click', openCartMenu);

    // Display products
    function drawProducts(products = []) {
        let productsUI = products.map((item) => {
            return `
                <div class="product">
                    <div class="productItem">
                        <img src="${item.imageurl}" class="productItemImg" alt="${item.title}">
                        <div class="productItemDesc">
                            <a onclick='saveItemData(${item.id})'>${item.title}</a>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <p>Size: ${item.size}</p>
                            ${item.price ? `<p>Price: ${item.price}</p>` : ''}
                            <i class="actions fas fa-shopping-cart" onclick="addedToCart(${item.id})"></i>
                            <i class="actions far fa-heart" style="color: ${item.liked ? "red" : ""}" onclick="addedTofavourite(${item.id})"></i>
                            ${item.isMe === "true" ? `<button class='editProduct' onclick='editProduct(${item.id})'>Edit Product</button>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        document.getElementById('productDom').innerHTML = `<div class="homecontainer">${productsUI}</div>`;
    }

    let storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        drawProducts(JSON.parse(storedProducts));
    }

    // Check if there is an item in local storage
    let productsInCart = localStorage.getItem("productsInCart");
    let addedItem = productsInCart ? JSON.parse(productsInCart) : [];
    updateCartUI(addedItem);

    function updateCartUI(cartItems) {
        cartProducts.innerHTML = "";
        cartItems.forEach((item) => {
            cartProducts.innerHTML += `<p>${item.title} <span class='item-qty'>${item.qty}</span></p>`;
        });
        
        badge.style.display = 'block';
        badge.innerHTML = cartItems.length;
    }

    // Add to cart
    function addedToCart(id) {
        let clickedItem = products.find((item) => item.id === id);
        let isProductInCart = addedItem.some((i) => i.id === clickedItem.id);

        if (isProductInCart) {
            addedItem = addedItem.map(p => {
                if (p.id === clickedItem.id) p.qty += 1;
                return p;
            });
        } else {
            addedItem.push(clickedItem);
        }

        updateCartUI(addedItem);

        // Save data
        localStorage.setItem('productsInCart', JSON.stringify(addedItem));
        badge.innerHTML = addedItem.length;
    }

    // Open and close cart notification
    function openCartMenu() {
        if (cartProducts.innerHTML !== "") {
            cartProductsMenu.style.display = cartProductsMenu.style.display === "block" ? "none" : "block";
        } else {
            cartProductsMenu.style.display = "block";
        }
    }

    // Search function
    let input = document.querySelector('#search');
    input.addEventListener('keyup', function(e) {
        let searchText = e.target.value;
        let storedProducts = localStorage.getItem("products");
        if (storedProducts) {
            let productsArray = JSON.parse(storedProducts);
            search(searchText, productsArray);
        }
    });

    function search(title, myArray) {
        let filteredArray = myArray.filter(item => item.title.toLowerCase().includes(title.toLowerCase()));
        drawProducts(filteredArray);
    }

    // Save data
    function saveItemData(id) {
        localStorage.setItem('productId', id);
        window.location = "cartDetails.html";
    }

    function getUniqueArr(arr, filterType) {
        let unique = arr
            .map((item) => item[filterType])
            .map((item, i, arr2) => arr2.indexOf(item) === i && i)
            .filter((item) => arr[item])
            .map((item) => arr[item]);
        return unique;
    }

    // Add to favourite 
    let favoriteItems = localStorage.getItem("productsInfavourite") ?
        JSON.parse(localStorage.getItem("productsInfavourite")) : [];

    function addedTofavourite(id) {
        let clickedItem = products.find((item) => item.id === id);
        clickedItem.liked = true;

        let isProductInFav = favoriteItems.some((i) => i.id === clickedItem.id);
        if (!isProductInFav) {
            favoriteItems = [...favoriteItems, clickedItem];
            let uniqueItems = getUniqueArr(favoriteItems, "id");
            localStorage.setItem('productsInfavourite', JSON.stringify(uniqueItems));
        }

        products = products.map((item) => {
            if (item.id === clickedItem.id) {
                item.liked = true;
            }
            return item;
        });
        localStorage.setItem('products', JSON.stringify(products));
        drawProducts(products);
    }

    // Filter product by size
    let sizeFilter = document.getElementById('searchfilter');
    sizeFilter.addEventListener('change', getProductFilterBySize);

    function getProductFilterBySize(e) {
        let val = e.target.value;
        let products = JSON.parse(localStorage.getItem('products')) || [];

        if (val === 'all') {
            drawProducts(products);
        } else {
            products = products.filter(i => i.size.toLowerCase() === val);
            drawProducts(products);
        }
    }

    // Edit products function
    function editProduct(id) {
        localStorage.setItem("editProduct", id);
        window.location = "editProduct.html";
    }

    // Change direction
    let en = document.getElementById('enLang');
    let ar = document.getElementById('arLang');
    // Events
    en.addEventListener('click', () => changeDir('ltr'));
    ar.addEventListener('click', () => changeDir('rtl'));

    function changeDir(dir) {
        document.documentElement.setAttribute("dir", dir);
        localStorage.setItem('langDir', dir);
    }

    // Expose functions to global scope
    window.addedToCart = addedToCart;
    window.addedTofavourite = addedTofavourite;
    window.saveItemData = saveItemData;
    window.editProduct = editProduct;
    window.changeDir = changeDir;
});
