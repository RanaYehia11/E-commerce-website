let productsInCart=localStorage.getItem("productsInCart");
let productDom=document.querySelector('.product');
let noProducts=document.querySelector('.noProducts');
if(productsInCart){
    let item=JSON.parse(productsInCart);
    drawCartProducts(item);
}


function drawCartProducts(products) {
     if(JSON.parse(localStorage.getItem("productsInCart")).length===0){
        noProducts.innerHTML= "There's no items !!!";
        noProducts.style.color = 'black';  
        noProducts.style.fontSize = '50px';  
        noProducts.style.fontWeight = 'bold'; 
        noProducts.style.position='absolute';
        noProducts.style.top= "40%"; 
        noProducts.style.left="38%";
        noProducts.style.transform.translate="(-40%,-40%)";


     }

    let productsui = products.map((item) => {
        return `
        <div class="product">
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

    document.getElementById('productDom').innerHTML = `<div class="homecontainer">${productsui}</div>`;
}
function removeItem(id){
    let productsInCart=localStorage.getItem("productsInCart");
    if(productsInCart){
        let item=JSON.parse(productsInCart);
        let filterItems=item.filter((item) => item.id !==id);
        localStorage.setItem("productsInCart", JSON.stringify(filterItems));
        drawCartProducts(filterItems)
    }
}


