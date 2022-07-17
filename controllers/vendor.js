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

    const user = await User.findById(req.user.userId)
    const userExists = await user.vendors.includes(req.params.id)
    let userStatus = ""
    if(!userExists){
        userStatus = "none"
    }else{
        if(vendor.createdById == req.user.userId){
            userStatus = "host"
        }else{
            userStatus = "attendee"
        }
    }
    res.status(StatusCodes.OK).json({vendor, userStatus})
}

const updateVendor = async(req, res)=>{
    let userStatus = ""
    const vendor = await Vendor.findByIdAndUpdate(
        req.params.id,
        req.body.vendorInfo,
        {new: true}
    )
    if(!vendor){
        throw new Error('Vendor does not exist.')
    }

    //have to change this depending on whether 'attendee' or 'none'
    if(vendor.createdById!=req.user.userId){
        
        if(req.body.userStatus === "none"){
            const user = await User.findByIdAndUpdate(
                req.user.userId,
                {$push: {"vendors":vendor}},
                {new:true}
            )
            userStatus = "attendee"
        }else if(req.body.userStatus === "attendee"){
            console.log(req.user.userId)
            console.log(req.user.username)
            try{
                const user = await User.findByIdAndUpdate(
                    req.user.userId, 
                    {$pull: {vendors: req.params.id}},
                    {safe: true, multi:false, new: true}
                )
                console.log(user.username)
                console.log(user._id)
            }catch(error){
                console.log(error)
            }
            userStatus="none"
        }
    }
    res.status(StatusCodes.OK).json({vendor,userStatus})
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