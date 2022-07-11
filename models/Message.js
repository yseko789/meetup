const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    content:{
        type: String,
        required: [true, 'Please provide the content.']
    },
    createdByUsername:{
        type: String,
        required: [true, 'Please provide a username.']
    },
    createdById:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the user ID.']
    },
},{timestamps: true})

module.exports = mongoose.model('Message', MessageSchema)