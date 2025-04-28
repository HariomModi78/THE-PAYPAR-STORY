let circle= document.querySelector(".circle");
let icon= document.querySelector(".circle i");
let main = document.querySelector("main");
let footer = document.querySelector(".footer");
let input = document.querySelector(".input");
let mode = document.querySelector(".mode");
let active = document.querySelector(".active");
let printout = document.querySelector(".printout");
let image = document.getElementsByClassName("image");
let number = document.getElementsByClassName("number");
let search = document.querySelector(".input");
search.addEventListener("click",function(){
    window.location.href = "/search";
})
circle.addEventListener("click",function(){
    circle.classList.toggle("dark");
    if(circle.classList.contains("dark")){
        icon.className = "ri-moon-line";
        main.style.cssText = "background-color:black;color:white;"
        input.style.cssText = "border-color:white"
        mode.style.cssText = "border-color:white"
        circle.style.cssText = "border-color:white"
        footer.style.cssText = "background-color:black;color:white";
        printout.style.cssText = "color:black";
        for(let i=0;i<number.length;i++){
            number[i].style.cssText = "border-color:white";
        }
        active.style.cssText = "background-color:white";

        for(let i=0;i<image.length;i++){
                image[i].style.cssText = "background-color:white"
        }
    }else{
        icon.className = "ri-sun-line";
        main.style.cssText = "background-color:white;color:black"
        input.style.cssText = "border-color:black"
        mode.style.cssText = "border-color:black"
        circle.style.cssText = "border-color:black"
        footer.style.cssText = "background-color:white;color:black";
        printout.style.cssText = "background-color:white;color:black";
        for(let i=0;i<number.length;i++){
            number[i].style.cssText = "border-color:black";
        }
        active.style.cssText = "background-color:black";

        for(let i=0;i<image.length;i++){
                image[i].style.cssText = "background-color:white"
        }
    }

})

