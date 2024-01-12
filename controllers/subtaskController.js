const subTaskModel = require("../models/subtaskModel.js")
const taskModel = require("../models/taskModel.js")

exports.createsubTask = async (req, res)=>{
    try{
         const {taskId,subTask } = req.body
         const task = await taskModel.findById(taskId)
         if(!task){
             return res.status(404).json({
                 message:'task not found'
             })
         }

       
        const taskSubTask = await subTaskModel.create({
            subTask
        })
        task.subTask.push(taskSubTask._id)
        taskSubTask.task = task._id
        await taskSubTask.save()
        await task.save()

        res.status(200).json({
            message:`subtasks created successfully`,
            taskSubTask
        })

    }catch(err){
       res.status(500).json({
        error: err.message
       })
    }
}

/*
exports.getSubtask = async(req, res)=>{
    try{
     const id = req.body.id
     const subtask = await subTaskModel.findById(id).populate("Task")
if(!subtask){
return res.status(403).json({
    message: "unable to get oe subtask"
})
}
res.status(200).json({
    message: "This is the subtask",
    subtask
})
    }catch(err){
        res.status(500).json({
            error: err.message
           })
    }
}

exports.getAllSubtask = async(req, res)=>{
    try{
        const {taskId} = req.body
        const task = await taskModel.findById(taskId)
        if(!task){
            return res.status(404).json({
                message:'task not found'
            })
        }
         const onetask = task.subTask
        const subtask = await subTaskModel.find().populate("Task")
    if(subtask.length === 0){
    return res.status(200).json({
    message: "unable to get all subtask"
})
}
res.status(200).json({
    message: "These are the subtasks",
    subtask
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


*/