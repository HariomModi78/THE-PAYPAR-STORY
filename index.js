const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join("public")));
app.set("view engine","ejs");
app.listen(3000,function(){
    console.log("Server is running");
})

app.get("/",function(req,res){
    res.render("home");
})

app.get("/home",function(req,res){
    res.render("home");
})

app.get("/profile",function(req,res){
    res.render("login");
})
app.get("/signup",function(req,res){
    res.render("signup");
})
app.get("/printout",function(req,res){
    res.render("printout");
})
app.get("/printoutOrder",function(req,res){
    res.render("printoutOrder");
})
app.get("/printoutOrderPayment",function(req,res){
    res.render("printoutOrderPayment");
})