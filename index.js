const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser");
const nodemailer = require("nodemailer");
const http = require("http");
const socket  = require("socket.io");
const server = http.createServer(app);
const io = socket(server);
require("dotenv").config();


const userDataBase = require("./models/user.js");
const printoutDataBase = require("./models/printout.js");

app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie());
app.set("view engine","ejs");
server.listen(3000,function(){
    console.log("Server is running");
})
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name:"dhgnqr8tz",
    api_key:process.env.File_KEY,
    api_secret:process.env.File_SECRET,
})
const storage = multer.diskStorage({
    // destination:function(req,file,cb){
    //     cb(null,"./document")
    // },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})
const upload = multer({storage:storage});

const transporter = nodemailer.createTransport({
    secure:true,
    host:"smtp.gmail.com",
    port:465,
    auth:{
        user:process.env.email,
        pass:process.env.pass
    }
})

function sendMail(to,sub,msg){
    transporter.sendMail({
        to:to,
        subject:sub,
        html:`<p>Hello,</p>
<p>Your OTP is: <b>${msg}</b></p>
<p>This OTP is valid for 5 minutes.</p>
<hr>
<p>Best Regards,</p>
<p><strong>Hariom Modi</strong></p>
<p>Contact us: THEPAYPARSTORY@gmail.com</p>
`
    })
}

app.get("/",async function(req,res){
    // await userDataBase.deleteMany();
    res.render("home");
})

app.get("/home",async function(req,res){
    res.render("home");
})

app.get("/profile",async function(req,res){
        if(req.cookies.token){
            let token = jwt.verify(req.cookies.token,"hariommodiji");
            let user = await userDataBase.findOne({_id:token.userId});
            // console.log(user);
            if(user){
                res.render("profile",{user:user})
            }else{
                console.log("user not found")
                res.render("login");
            }
        }else if(req.cookies.mama){
            res.render("signup")
        }else{
            console.log("in catch block");
            res.render("login");
        }
       
    
    
})
app.post("/detail",async function(req,res){
    try{
        if(req.body.mobileNumber.length==10){
            let token = jwt.verify(req.cookies.token,"hariommodiji");
            let user =  await userDataBase.findOneAndUpdate({_id:token.userId},{
                username:req.body.username,
                mobileNumber:req.body.mobileNumber
            });
            res.redirect("/profile")
        }
        else{
            res.send("10 digit mobile number is required")
        }
    }catch(e){
        res.render("error")
    }
    
})

app.post("/changeAddress",async function(req,res){
    try{
        let token = jwt.verify(req.cookies.token,"hariommodiji");
        await userDataBase.findOneAndUpdate({_id:token.userId},{
            college:req.body.college,
            block:req.body.block,
            department:req.body.department,
            roomNumber:req.body.roomNumber,
        });
       
        res.redirect(`/profile`);
    }catch(e){
        res.render("error")
    }
    
}) 
app.post("/otp",async function(req,res){
        let otp = ((Math.random()*9000)+1000).toFixed(0);
        sendMail(req.body.email,"OTP",otp)
        let lala = jwt.sign({email:req.body.email,otp:otp},"hariommodiji");
        res.cookie("lala",lala);
        
        res.render("otp");    
})
app.post("/verifyOtp",async  function(req,res){
    let lala = jwt.verify(req.cookies.lala,"hariommodiji");
    if(lala.otp == req.body.otp){
        if(!await userDataBase.findOne({email:lala.email})){
            await userDataBase.create({
                email:lala.email,
            })
        res.cookie("mama",lala.email);
        res.redirect("/profile");
        }else{
            let email = jwt.verify(req.cookies.lala,"hariommodiji");
            let user = await userDataBase.findOne({email:email.email})
            let token = jwt.sign({userId:user._id},"hariommodiji");
            console.log(token)
            res.cookie("token",token);
            res.redirect("/profile");
        }
    }else{
        res.send("wrong otp");
    }
})
app.get("/signup",async function(req,res){
    res.render("signup");
})
app.post("/signup",async function(req,res){
    let email = jwt.verify(req.cookies.lala,"hariommodiji");
    let user = await userDataBase.findOne({email:email.email})
    await userDataBase.findOneAndUpdate({email:email.email},{
        username:req.body.username,
        mobileNumber:req.body.mobileNumber,
        college:req.body.college,
        block:req.body.block,
        department:req.body.department,
        roomNumber:req.body.roomNumber,
    });
    console.log(user)
    let token = jwt.sign({userId:user._id},"hariommodiji");
    console.log(token)
    res.cookie("token",token)
    // console.log(user);
    res.redirect("/home")
})
app.get("/printout",async function(req,res){
    if(req.cookies.token){
        res.render("printout");
    }else{
        res.redirect("/profile")
    }
})
app.post("/printoutOrder",upload.single("document"),async function(req,res){
   let result =  await cloudinary.uploader.upload(req.file.path,{
        folder:"Uploads",
        resource_type: "auto" 
    })
    let userId = jwt.verify(req.cookies.token,"hariommodiji");
    let token = ((Math.random()*9000)+1000).toFixed(0);
    console.log(JSON.stringify(result, null, 2));
    let print = await printoutDataBase.create({
        userId:userId.userId,
        status:"pending",
        document:result.url,
        token:token,
        page:result.pages,
        height:result.height,
        width:result.width
    })
    // console.log(print)
    // console.log("📄 PDF URL:", result.url);
    // let url = result.url;
    // url = url.replace(".pdf",".jpeg");
    // console.log(url)
    res.redirect(`/printoutOrder/${print._id}`);
})
app.get("/printoutOrder/:printId",async function(req,res){
    let print = await printoutDataBase.findOne({_id:req.params.printId});
    res.render("printoutOrder",{print:print});
})
app.get("/printoutOrderPayment/:printId",async function(req,res){
    let print = await printoutDataBase.findOne({_id:req.params.printId});
    res.render("printoutOrderPayment",{print:print});
})
app.get("/search",function(req,res){
    res.render("search");
}) 

// io.on("connection",function(socket){
//     console.log("connected" ,socket.id);
//     socket.on("token",function(){

//     })
// })
