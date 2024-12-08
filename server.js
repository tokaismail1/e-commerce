const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const categorySchema = require('./models/categoryModel') 
const categoryRoute = require('./routes/categoryRoute')
const userSchema = require('./models/userModel') 
const userRoute = require('./routes/userRoute')

//password db : M9OzKCZ9TGwpCJi0
const app = express()
app.use(bodyParser.json())
const url = "mongodb+srv://tokaismail1122:M9OzKCZ9TGwpCJi0@cluster0.pygm4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToDatabase = async => {
    try{
        mongoose.set('strictQuery' , false)
        mongoose.connect(url)
        console.log("connected to database")

    }catch(error){
        console.log(error)
        process.exit
    }
    
}

connectToDatabase ()
app.use('/api/users' , userRoute )
app.use('/api/categories' , categoryRoute )



const port = 3003;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});