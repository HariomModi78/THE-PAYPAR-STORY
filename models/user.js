const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout in case of connection issues
  });
const db = mongoose.connection;
db.once("open",function(){
    console.log("DB successful connected!");
})

const userSchema = mongoose.Schema({
    username:String,
    mobileNumber:String,
    email:String,
    college:String,
    block:String,
    department:String,
    roomNumber:String,
    profilePicture:String,
    referCode:String,
    type:{
        type:String,
        default:"user"
    }
})

module.exports = mongoose.model("user",userSchema);