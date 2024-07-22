let userinfo=document.querySelector('#userinfo');
let userDom=document.querySelector('#user');
let links=document.querySelector('#links');
let logout=document.querySelector('#logout');
if( localStorage.getItem("username")){
    links.remove();
    userinfo.style.display="flex";
    userDom.innerHTML=localStorage.getItem("username");
}
logout.addEventListener('click',function(e){
    e.preventDefault();
    localStorage.clear();
    setTimeout(() => {
        window.location='login.html';
    });

});