let username=document.querySelector("#username");
let forget=document.querySelector("#forget");
let password=document.querySelector("#password");
let signin=document.querySelector("#signin");
let getuser=localStorage.getItem('username');
let getpassword=localStorage.getItem('password');

signin.addEventListener('click', function(e){
    e.preventDefault();
if(username.value==='' || password.value===''){
    alert("Please fill The Data");
}
else{
    if(getuser && getuser.trim()===username.value.trim() && getpassword ===password.value )
  {
    setTimeout(() => {
        window.location='index.html';
    },1500);

}
else{alert("Username or password is wrong")

}
}
});

forget.addEventListener('click',function(){
    alert("Sign in with Your Phone Number");
})