let input = document.querySelector("input");
let button = document.querySelector(".button");
let box = document.querySelector(".box");
button.addEventListener("click",function(){
    box.innerText ="Loading..."

    if(input.value != ""){
        socket.emit("searchItem",input.value);
    }
})
