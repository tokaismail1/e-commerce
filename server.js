const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const cartRoute = require('./routes/cartRoute')

//password db : M9OzKCZ9TGwpCJi0
const app = express()
app.use(bodyParser.json())
const url = "mongodb+srv://tokaismail1122:M9OzKCZ9TGwpCJi0@cluster0.pygm4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToDatabase = () => {
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
app.use('/api/product' , productRoute )
app.use('/api/cart', cartRoute); 





const port = 3004;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});