require('dotenv').config()

const express = require('express')
const app = express()


//setup socket.io
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin: ["http://localhost:3000"]
    }
})

io.on("connection",(socket)=>{
    console.log(`User Connected: ${socket.id}`)
    socket.on("send_message", (data)=>{
        socket.broadcast.emit("receive_message",data)
    })
})




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
        server.listen(port,()=>{
            console.log('Server listening...')
        })
    }catch(error){
        console.log(error)
    }
}

start()

// const io = require('socket.io')(3001, {
//     cors:{
//         origin: ['http://localhost:3000'],
//     },
// })

// io.on('connection', socket =>{
//     console.log(socket.id)
// })