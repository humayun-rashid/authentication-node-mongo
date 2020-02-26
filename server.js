const express = require ('express')
const app = express()
const authRouter = require('./routes/router')
app.use(express.json())
app.use('/auth',authRouter)

//Mongo DB init
const mongoose = require('mongoose')
var mongoDB = 'mongodb://127.0.0.1/my_database'
mongoose.connect(mongoDB, { useUnifiedTopology: true,useNewUrlParser: true  })
const db = mongoose.connection
db.on('error',function(error){console.error(error)})
db.once('open',function(){
    console.log('Database is connected.')
})



app.listen(3000, function(){
    console.log('Server is running in 3000')
})