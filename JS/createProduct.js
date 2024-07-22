// Variables
let prodName = document.getElementById('pName');
let prodDescribtion = document.getElementById('pDesc');
let prodSize = document.getElementById('size');
let createForm = document.getElementById('createForm');
let uploadImg = document.getElementById('uploadImg');
let prodSizeValue;
let imageUrl = 'images/default-product.jpg'; // Default image

// Events
prodSize.addEventListener('change', getProdSizeValue);
createForm.addEventListener('submit', createProdFunc);
uploadImg.addEventListener('change', uploadImage);

// Functions
function getProdSizeValue(e) {
    prodSizeValue = e.target.value;
}

function createProdFunc(e) {
    e.preventDefault();
    let allProducts = JSON.parse(localStorage.getItem('products')) || [];
    let nameValue = prodName.value;
    let descValue = prodDescribtion.value;

    let obj = {
        id: allProducts.length + 1,
        qty: 1,
        title: nameValue,
        size: prodSizeValue,
        description: descValue,
        imageurl: imageUrl,
        isMe: "true"
    };

    let newProducts = [...allProducts, obj];
    localStorage.setItem('products', JSON.stringify(newProducts));
    //// return the form empty
    prodName.value = "";
    prodSize.value = "";
    prodDescribtion.value = "";
    imageUrl = 'images/default-product.jpg'; // Reset to default image
    uploadImg.value = ""; // Reset file input
    // go to home page after adding product
     window.location= "index.html"
}

// Upload Image
function uploadImage() {
    let file = this.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
        imageUrl = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    }
}


