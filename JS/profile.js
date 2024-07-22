
//Get Data From local storage
let getuserName=localStorage.getItem('userName')
let getemail=localStorage.getItem('email')
//variables
let userDom2=document.getElementById('userName')
let userEmailDom=document.getElementById('email')
let products=JSON.parse(localStorage.getItem('products'))||products;
let myProduct=products.filter( (i) => i.isMe==="true");
let prodLength=document.querySelector('#prodLength span')

userDom2.innerHTML=getuserName;
userEmailDom.innerHTML=getemail;
prodLength.innerHTML =myProduct.length;

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
