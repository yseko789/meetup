const {StatusCodes} = require('http-status-codes')

const User = require('../models/User')

const register = async(req,res)=>{
    const newUser = await User.create(req.body)
    const token = newUser.createJWT()
    console.log("success")
    res.status(StatusCodes.CREATED).json({username: newUser.username, userId: newUser._id,token})
}

const login = async(req,res)=>{
    const {email, password} = req.body
    if(!email){
        throw new Error('Email is required.')
    }
    if(!password){
        throw new Error('Password is required.')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Wrong email.')
    }
    if(await user.comparePassword(password)){
        const token = user.createJWT();
        res.status(StatusCodes.OK).json({username: user.username, userId: user._id,token})
    }else{
        throw new Error('Wrong password.')
    }
}

module.exports = {register, login}