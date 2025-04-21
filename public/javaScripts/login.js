let back = document.querySelector(".back");
let input = document.querySelector(".input");
input.focus();
window.addEventListener("click",function(){
    input.focus();
    
})
back.addEventListener("click",function(){
    window.location.href = "/home"
})
let email = [];
input.addEventListener("input",function(){

    if(input.value.includes("@gmail.com") ){
        document.querySelector(".login").style.cssText = "background-color: rgb(255, 194, 181);font-weight: 500;";
        document.querySelector(".login").focus();
    }
})