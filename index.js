require('dotenv').config()

const express = require('express')
const app = express()

const Message = require('./models/Message')
const Vendor = require('./models/Vendor')

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
    // when a socket connects to the server (enters chat room), past messages are sent
    socket.on('join-room', async (data)=>{
        socket.join(data)
        const vendorMessagesId = await Vendor.findById(data).select('messages')
        const vendorMessages = await Message.find().where('_id').in(vendorMessagesId.messages)
        if(vendorMessages.length>0){
            socket.emit('past-messages', vendorMessages)
        }
    
    })

    

    socket.on("send-message", async (data)=>{
        io.in(data.room).emit("receive-message",data.message)
        const newMessage = await Message.create(data.message)
        const vendor = await Vendor.findByIdAndUpdate(
            data.room, 
            {$push:{"messages":newMessage}},
            {new:true}
        )
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