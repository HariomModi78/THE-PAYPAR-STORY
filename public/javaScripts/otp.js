let one = document.querySelector(".one");
let two = document.querySelector(".two");
let three = document.querySelector(".three");
let four = document.querySelector(".four");
// let otp = document.querySelector(".submitOtp")
let icon = document.querySelector(".logo")
let form = document.querySelector("form")
let login = document.querySelector(".login")
let otp = document.querySelector(".otpReal");

one.addEventListener("input",function(){
        two.focus();
})
two.addEventListener("input",function(){
        three.focus();
})
three.addEventListener("input",function(){
        four.focus();
})
four.addEventListener("input",function(){
        login.focus();
        login.style.cssText = "background-color: rgb(255, 194, 181);font-weight: 500;"
})
window.addEventListener("input",function(){
        otp.value = `${one.value + two.value+three.value+four.value}`;
        console.log(otp.value)
})