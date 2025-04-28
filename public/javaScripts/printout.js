let upload = document.querySelector("input");
let search = document.querySelector(".input");
let loading = document.querySelector(".loading");
let inside = document.querySelector(".inside");
let load = document.querySelector(".load");
let form = document.querySelector("form");
let animation = document.querySelector(".animation");
search.addEventListener("click",function(){
    window.location.href = "/search";
})
upload.addEventListener("change",function(){
    animation.style.cssText = "display:flex"
    let count = 0;
    let interval = setInterval(function(){
        load.style.cssText = `width:${count}%`;
        inside.innerText = `${count}%`
        count++;
        if(count==70){
            form.submit();
        }
        if(count == 101){
            clearInterval(interval);
        }
    },60)
})


