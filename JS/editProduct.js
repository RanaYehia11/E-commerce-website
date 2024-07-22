// Variables
let products = JSON.parse(localStorage.getItem('products')) || [];
let productId = JSON.parse(localStorage.getItem("editProduct"));
let getProduct = products.find(i => i.id === productId);
let prodName = document.getElementById('pName');
let prodDescribtion = document.getElementById('pDesc');
let prodSize = document.getElementById('size');
let updateForm = document.getElementById('updateForm');
let uploadImg = document.getElementById('uploadImg');
let prodSizeValue;
let prodImage = getProduct.imageurl; // Use the existing image URL

// Initialize form fields with product data
prodName.value = getProduct.title;
prodDescribtion.value = getProduct.description; 
prodSize.value = getProduct.size;

// Events
prodSize.addEventListener('change', getProdSizeValue);
updateForm.addEventListener('submit', updateProdFunc);
uploadImg.addEventListener('change', uploadImage);

// Functions
function getProdSizeValue(e) {
    prodSizeValue = e.target.value;
}

function updateProdFunc(e) {
    e.preventDefault();

    getProduct.title = prodName.value;
    getProduct.description = prodDescribtion.value;
    getProduct.size = prodSize.value;
    getProduct.imageurl = prodImage; // Use the updated image URL

    localStorage.setItem('products', JSON.stringify(products));

    // Clear the form fields
    prodName.value = "";
    prodSize.value = "";
    prodDescribtion.value = "";
    uploadImg.value = "";

    // Redirect to the home page after updating the product
    window.location = "index.html";
}

// Upload Image
function uploadImage() {
    let file = this.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
        prodImage = reader.result; // Update prodImage with the new image URL
    }
    if (file) {
        reader.readAsDataURL(file);
    }
}
