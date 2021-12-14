const express =require('express')
const env = require('dotenv')
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const { urlencoded } = require('body-parser')
const app = express()

// Environment variable 
env.config()
const PORT = process.env.PORT || 2000

mongoose.connect(
     `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster.tugic.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
     {
         useNewUrlParser: true, 
         useUnifiedTopology: true
     }     
).then(() => {
    console.log('Database connected')
})

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());
app.use('/api',userRoutes)

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Hello Server"
    })
})

app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
} )