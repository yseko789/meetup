const mongoose = require('mongoose')

const VendorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide a name.'],
        minlength: 3,
        maxlength: 50
    },
    number:{
        type: String
    },
    peopleCurrent:{
        type: Number,
        required: [true, 'Please provide the current number of people.']
    },
    peopleNeeded:{
        type: Number,
        required: [true, 'Please provide the number of people needed.']
    },
    description:{
        type: String,
        required: [true, 'Please provide a description.']
    },
    time:{
        type: Date,
        required: [true, 'Please provide a time.']
    },
    location:{
        type: String,
        required: [true, 'Please provide a location.']
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
    messages: [{type: mongoose.Types.ObjectId, ref: 'Message'}]
})


module.exports = mongoose.model('Vendor', VendorSchema)