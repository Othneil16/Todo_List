const statusModel = require('../models/statusModel')
const userModel = require("../models/userModel.js")

exports.createStatus = async (req, res)=>{
    try{
        const {id, title} = req.body
        // const user = await userModel.findById(id)
        // if(!user){
        //     return res.status(404).json({
        //         message:'user not found'
        //     })
        // }
       
        const status = await statusModel.create({
            title
        })
        // user.status.push(status._id)
        await status.save()
        // await user.save()
        res.status(200).json({
            message:`${title} created successfully`,
            status
        })

    }catch(err){
       res.status(500).json({
        error: err.message
       })
    }
}

exports.getStatus = async(req, res)=>{
    try{
const id = req.body.id
const status = await statusModel.findById(id).populate("Task")
if(!status){
return res.status(403).json({
    message: "unable to get all status"
})
}
res.status(200).json({
    message: "These are the status",
    status
})
    }catch(err){
        res.status(500).json({
            error: err.message
           })
    }
}

exports.getAllStatus = async(req, res)=>{
    try{
        const status = await statusModel.find().populate("Task")
    if(status.length === 0){
    return res.status(200).json({
    message: "unable to get all users"
})
}
res.status(200).json({
    message: "These are the To-Do",
    status
})
    }catch(err){
        res.status(500).json({
            error: err.message
           })
    }
}

