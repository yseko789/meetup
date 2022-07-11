const {StatusCodes} = require('http-status-codes')
const User = require('../models/User')
const Vendor = require('../models/Vendor')

const getUser = async(req, res)=>{
    const user = await User.findOne({_id: req.user.userId})
    res.status(StatusCodes.OK).json({user})
}

const updateUser = async(req, res)=>{
    const {body: {username, password, email}, user: {userId}} = req
    if(username === '' || password === '' || email === ''){
        throw new Error('Username, password, and email are required.')
    }
    const user = await User.findByIdAndUpdate(userId, req.body, {new: true, runValidators: true})
    if(!user){
        throw new Error('User does not exist.')
    }
    res.status(StatusCodes.OK).json(user)
}

const createMyVendor = async(req, res)=>{
    const {body:{name, peopleCurrent, peopleNeeded, description, time, location}, user:{userId, username}} = req

    if(name === "" || 
    (peopleCurrent==0||peopleCurrent>peopleNeeded)||
    peopleNeeded <2||
    description === "" ||
    !time||
    location === ""){
        throw new Error('Missing field(s).')
    }
    req.body.createdById = userId
    req.body.createdByUsername = username
    const vendor = await Vendor.create(req.body)
    const user = await User.findByIdAndUpdate(
        userId, 
        {$push:{"vendors":vendor}},
        {new:true}
    )
    res.status(StatusCodes.CREATED).json(vendor)
}

const getMyVendors = async(req, res)=>{
    const vendorsId = await User.findById(req.user.userId, 'vendors')
    const vendors = await Vendor.find().where('_id').in(vendorsId.vendors)
    res.status(StatusCodes.OK).json(vendors)
}

module.exports = 
{
    getUser,
    updateUser,
    createMyVendor,
    getMyVendors
}