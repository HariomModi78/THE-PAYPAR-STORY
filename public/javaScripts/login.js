const socket  = io();
if(localStorage.getItem("token")){
    socket.emit("token");
}
let back = document.querySelector(".back");
let input = document.querySelector(".input");
let login = document.querySelector(".login");
let email = document.querySelector(".email");
input.focus();
window.addEventListener("click",function(){
    input.focus();
    
})
back.addEventListener("click",function(){
    window.location.href = "/home"
})
input.addEventListener("input",function(){

    if(input.value.includes("@gmail.com") ){
        email.value = input.value;
        document.querySelector(".login").style.cssText = "background-color: rgb(255, 194, 181);font-weight: 500;";
        document.querySelector(".login").focus();
    }
})

// login.addEventListener("click",function(event){
//     if(!input.value.includes("@gmail.com")){
//         event.preventDefault();
//     }else{
//     }
// })