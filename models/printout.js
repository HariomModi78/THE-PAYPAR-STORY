const mongoose = require("mongoose");

const printoutSchema = mongoose.Schema({
    userId:String,
    token:String,
    status:String,
    document:String,
    page:Number,
    height:Number,
    width:Number
})

module.exports = mongoose.model("printout",printoutSchema);