//register for user
let username=document.querySelector("#username");
let email=document.querySelector("#email");
let password=document.querySelector("#password");
let signUp=document.querySelector("#signUp");

signUp.addEventListener('click', register);
function register(e){
    e.preventDefault();
    if(username.value==="" || email.value==="" ||password.value===""){
        alert("Please Fill Data");
    }
    else{
        localStorage.setItem('username',username.value);
        localStorage.setItem('password',password.value);
        localStorage.setItem('email',email.value);

        setTimeout(() => {
            window.location='login.html';
        },1500);
    }
}

