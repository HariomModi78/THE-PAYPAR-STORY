let order = document.querySelector(".pay");
order.addEventListener("click",function(){
    window.location.href = `/printoutOrderPayment/${order.id}`
})
let image = document.querySelector(".fileImage img");

let option = document.getElementsByClassName("option");
localStorage.setItem("color","B&W");
localStorage.setItem("orientation","portrait");
localStorage.setItem("side","single");
for(let i=0;i<option.length;i++){
    option[0].classList.add("selected");
    option[2].classList.add("selected");
    option[4].classList.add("selected");
    option[i].addEventListener("click",function(){
        if(i%2!=0){
            option[i-1].classList.remove("selected");
            option[i].classList.add("selected");
            if(i==1){
                localStorage.setItem("color","colorfull");
            }else if(i==3){
                localStorage.setItem("orientation","landscape");
            }else if(i==5){
                localStorage.setItem("side","double");
            }
        }else{
            option[i+1].classList.remove("selected");
            option[i].classList.add("selected");
            if(i==0){
                localStorage.setItem("color","B&W");
            }else if(i==2){
                localStorage.setItem("orientation","portrait");
            }else if(i==4){
                localStorage.setItem("side","single");
            }
        }
        console.log(localStorage.getItem("color"))
        if((localStorage.getItem("color")) == "B&W"){
            image.style.cssText = "filter: grayscale(100%);"
            console.log("B&W")
        }else{
            image.style.cssText = "filter: grayscale(0%);"
            console.log("colorfull");
        }
        if(localStorage.getItem("orientation") == "portrait"){
            image.style.cssText += "rotate:0deg;"
        }else{
            image.style.cssText += "rotate:90deg;width:150%;height:150%;border:2px solid orange;"
        }
        if(localStorage.getItem("side") == "single"){
            console.log("single side");
        }else{
            console.log("double side");
        }
    })
}

let inc = document.querySelector(".inc");
let dec = document.querySelector(".dec");
let number = document.querySelector(".number");
inc.addEventListener("click",function(){
    number.innerText = parseInt(number.innerText) + 1;
    
})
dec.addEventListener("click",function(){
    if(parseInt(number.innerText)!=1){
    number.innerText = parseInt(number.innerText) - 1;
    }
})