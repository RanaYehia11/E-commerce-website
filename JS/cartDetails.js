let products=JSON.parse(localStorage.getItem("products"));
//console.log(products)
let productId=localStorage.getItem('productId');
let itemDom=document.querySelector('.itemDetails')
let productDetails=products.find( item => item.id==productId)
itemDom.innerHTML =`

                <img src="${productDetails.imageurl}">
                <h2>${productDetails.title}</h2>
                <p>Size :${productDetails.size}</p>
                <p>Price: ${productDetails.price}</p>
                

          
`