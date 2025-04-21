let back = document.querySelector(".back");
let refer = document.querySelector(".refer");
let referInput = document.querySelector(".referInput");
let arrow = document.querySelector(".refer i");
let count = 0;
refer.addEventListener("click",function(){
    if(count%2==0){
        referInput.style.cssText = "display:flex";
        arrow.style.cssText = "rotate:90deg"
        count++;
    }else{
        referInput.style.cssText = "display:none";
        arrow.style.cssText = "rotate:0deg"
        count++;
    }
})
document.querySelector("#username").focus();
back.addEventListener("click",function(){
    window.location.href = "/home"
})
