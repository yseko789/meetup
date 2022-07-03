const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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
        required: true
    },
    location:{
        type: String,
        required: true
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the user.']
    }
})

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId: this._id, username: this.username}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

UserSchema.methods.comparePassword = async function(typedPassword){
    const isMatch = await bcrypt.compare(typedPassword, this.password);
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)