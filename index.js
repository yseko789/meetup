require('dotenv').config()

const express = require('express')
const app = express()

// database
const connectDB = require('./database/connect')

// middleware
const authenticateUser = require('./middleware/authentication')

// routes
const authRouter = require('./routes/auth')
const accountRouter = require('./routes/account')
const vendorRouter = require('./routes/vendor')

app.use(express.json())



app.use('/auth', authRouter)
app.use('/account',authenticateUser, accountRouter)
app.use('/vendor', authenticateUser, vendorRouter)
// app.use('/vendor', vendorRouter)

const port = 3001

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