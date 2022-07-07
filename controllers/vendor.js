const Vendor = require('../models/Vendor')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')

const getVendor = async(req, res)=>{
    const vendor = await Vendor.findById(
        req.params.id
    )

    if(!vendor){
        throw new Error('Vendor does not exist.')
    }
    res.status(StatusCodes.OK).json(vendor)
}

const updateVendor = async(req, res)=>{
    const vendor = await Vendor.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    if(!vendor){
        throw new Error('Vendor does not exist.')
    }
    if(vendor.createdBy!=req.user.userId){
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            {$push: {"vendors":vendor}},
            {new:true}
        )
    }
    res.status(StatusCodes.OK).json(vendor)
}

const getAllVendors = async(req, res)=>{
    const vendors = await Vendor.find()
    console.log('connected')
    res.status(StatusCodes.OK).json({vendors})
    
}

module.exports = 
{
    getVendor,
    updateVendor,
    getAllVendors
}