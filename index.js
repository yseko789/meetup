require('dotenv').config()

const express = require('express')
const app = express()

const connectDB = require('./database/connect')

const authRouter = require('./routes/auth')

app.use(express.json())

// app.get('/',(req,res)=>{
//     console.log('Here')
//     res.send("Hi")
// })

app.use('/auth', authRouter);

const port = 3000

const start = async()=>{
    try{
        console.log('started')
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log('Server listening...')
        })
    }catch(error){
        console.log(error)
    }
}

start()