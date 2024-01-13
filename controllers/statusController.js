const statusModel = require('../models/statusModel')
const userModel = require("../models/userModel.js")

exports.createStatus = async (req, res)=>{
    try{
        const {statusDesc} = req.body
      
        const status = await statusModel.create({
            statusDesc
        })
     
        await status.save()
        return res.status(200).json({
            message:`${statusDesc} status created successfully`,
            data:status
        })

    }catch(err){
        return res.status(500).json({
        error: err.message
       })
    }
}

exports.getStatus = async(req, res)=>{
    try{
     const id = req.body.id
    const status = await statusModel.findById(id).populate("Tasks")
    if(!status){
    return res.status(403).json({
    message: "unable to get all status"
})
}
return res.status(200).json({
    message: "These are the status",
    data:status
})
    }catch(err){
        return res.status(500).json({
            error: err.message
           })
    }
}

exports.getAllStatus = async(req, res)=>{
    try{
        const status = await statusModel.find()
    if(status.length === 0){
    return res.status(200).json({
    message: "unable to get all tasks"
})
}
    return res.status(200).json({
    message: "These are the To-Do status",
    data: status
})
    }catch(err){
        return res.status(500).json({
            error: err.message
           })
    }
}

