const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const categorySchema = require('./models/categoryModel') 
const categoryRoute = require('./routes/categoryRoute')


const app = express()
app.use(bodyParser.json())
const url = "mongodb+srv://tokaismail1122:Toka1122@cluster0.ov5lu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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

app.use('/api/categories' , categoryRoute )


app.listen(3010)