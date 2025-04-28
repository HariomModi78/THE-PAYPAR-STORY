let footerBox = document.getElementsByClassName("footerBox");

for(let i=0;i<footerBox.length;i++){
    footerBox[i].addEventListener("click",function(){
        console.log(footerBox[i].classList[1])
        window.location.href = `/${footerBox[i].classList[1]}`
    })
}