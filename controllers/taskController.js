const taskModel = require('../models/taskModel')
const userModel = require("../models/userModel.js")
const statusModel = require("../models/statusModel.js")
const subTaskModel = require('../models/subtaskModel.js')

exports.createTask = async (req, res)=>{
    try{

        const {statusId, title, desc} = req.body
        const userId = req.user.userId
        const status = await statusModel.findById(statusId)
        const user = await userModel.findById(userId)

        if(!status  && !user){
            return res.status(404).json({
                message:'User or status not found'
            })
        }

        const task = await taskModel.create({
            title,
            desc
        })
        
        user.task.push(task._id)
        status.Task.push(task._id)
        await task.save()
        await user.save()
        await status.save()

       if(!task){
            return res.status(404).json({
                message:`unable to create task`,
                status
            })

    }else{
        return res.status(200).json({
            message:`A task created successfully`,
            status
        })
    }
}catch(err){
    res.status(500).json({
     error: err.message
    })
 }
}

exports.deleteTask = async(req, res)=>{
    try{
   const taskId = req.params.taskId
   const subTaskId = req.params.subTaskId

   const task = await taskModel.findByIdAndDelete(taskId)
   const subTask = await subTaskModel.findById(subTaskId)

   await subTask.deleteMany({task:id})
if(!task){
    return res.status(404).json({
        message:"unable to delete task"
    })
}else{
    res.status(200).json({
        message:" Task has been successfully deleted"
    })
}
    }catch(err){
        res.status(500).json({
            error: err.message
           })
    }
}


exports.updateTask = async(req, res)=>{
    try{
   const {id, title, desc} = req.body
   const taskId = await taskModel.findById(id)
   
   if(!taskId){
    return res.status(404).json({
        message:"cannot find task"
    })
}

   const updatetask = await taskModel.findByIdAndUpdate(taskId, {title, desc}, {new:true})

if(!updatetask){
    return res.status(404).json({
        message:"unable to update task"
    })
}else{
    res.status(200).json({
        message:"Task has been successfully updated",
        updatetask
    })
}
    }catch(err){
        res.status(500).json({
            error: err.message
           })
    }
}



exports.getTask = async(req, res)=>{
    try{
     const id = req.body.id
     const task = await taskModel.findById(id).populate("subTask")
if(!task){
return res.status(403).json({
    message: "unable to get task"
})
}
res.status(200).json({
    message: "Here is your task",
    task
})
    }catch(err){
        res.status(500).json({
            error: err.message
           })
    }
}

exports.getAlltask = async(req, res)=>{
    try{
        const tasks = await taskModel.find()
        if(!tasks){
            return res.status(404).json({
                message:'task not found'
            })
        }
    if(tasks.length === 0){
    return res.status(203).json({
    message: "unable to get all task"
})
}
res.status(200).json({
    message: `There are ${tasks.length} tasks present `,
    tasks
})
    }catch(err){
        res.status(500).json({
            error: err.message
           })
    }
}


exports.deleteSubtask = async(req, res)=>{
    try{
   const subTaskId = req.params.subTaskId

   const subTask = await subTaskModel.findByIdAndDelete(subTaskId)

if(!subTask){
    return res.status(404).json({
        message:"unable to delete subTask"
    })
}else{
    res.status(200).json({
        message:" subTask has been successfully deleted"
    })
}
    }catch(err){
        res.status(500).json({
            error: err.message
           })
    }
}


