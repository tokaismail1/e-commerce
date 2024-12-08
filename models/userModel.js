const  mongoose  = require("mongoose");
// create my own module
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name : String,
    age : Number,
    phone : {type : String , unique : true},
    email : {type : String , unique : true},
    password : String

})


module.exports = mongoose.model('User' , userSchema)  // to use module autside this file
