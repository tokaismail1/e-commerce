const  mongoose  = require("mongoose");
// create my own module
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name :{type: String, require:true},
    age : {type:Number, require:true},
    phone : {type : String , unique : true, require:true},
    email : {type : String , unique : true, require:true},
    password : {type:String, require:true},
    address: { type: String },// optional

})


module.exports = mongoose.model('User' , userSchema)  // to use module autside this file
