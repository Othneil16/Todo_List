const taskModel = require('../models/taskModel')
const userModel = require("../models/userModel.js")
const statusModel = require("../models/statusModel.js")
const subTaskModel = require('../models/subtaskModel.js')

exports.createTask = async (req, res)=>{
    try{

        const {statusId, title, desc} = req.body
        const {userId} = req.user
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

        // Check if the task ID is not already in the user's tasks array
        if (!user.task.includes(task._id)) {
        user.task.push(task._id);
        }

        // Check if the task ID is not already in the status's Tasks array
        if (!status.Tasks.includes(task._id)) {
        status.Tasks.push(task._id);
        }

        
        // user.task.push(task._id)
        // status.Tasks.push(task._id)
        task.userId = userId
        await task.save()
        await user.save()
        await status.save()

       if(!task){
            return res.status(404).json({
                message:`unable to create task`,
            })

    }else{
        return res.status(200).json({
            message:`A task created successfully`,
            data: task
        })
    }
}catch(err){
    return res.status(500).json({
     error: err.message
    })
 }
}

exports.deleteTask = async(req, res)=>{
    try{
   const {userId} = req.user
   const {taskId, subTaskId} = req.body
   const checkTask = await taskModel.findById(taskId)
if (checkTask.userId !== userId) {
    return res.status(403).json({
        message: "Permission denied. You are not the owner of this task."
    });
}

   const task = await taskModel.findByIdAndDelete(taskId)
   const subTask = await subTaskModel.findById(subTaskId)

    await subTask.deleteMany({task:id})
   if(!task){
    return res.status(404).json({
        message:"unable to delete task"
    })    
   }else{
    return res.status(200).json({
        message:"Task has been successfully deleted",
        data:task
    })
}
    }catch(err){
        return res.status(500).json({
            error: err.message
           })
    }
}


exports.updateTask = async(req, res)=>{
    try{
   const {userId} = req.user
   const {taskId, title, desc} = req.body
   const task = await taskModel.findById(taskId)
  
   if(!taskId){
    return res.status(404).json({
        message:"cannot find task"
    })
}
   
if (task.userId !== userId) {
    return res.status(403).json({
        message: "Permission denied. You are not the owner of this task."
    });
}

   const updatetask = await taskModel.findByIdAndUpdate(taskId, {title, desc}, {new:true})

   if(!updatetask){
    return res.status(404).json({
        message:"unable to update task"
    })
   }else{
   return res.status(200).json({
        message:"Task has been successfully updated",
        data: updatetask
    })
}
    }catch(err){
      return  res.status(500).json({
            error: err.message
           })
    }
}



exports.getTask = async(req, res)=>{
    try{
     const {userId} = req.user
     const {taskId} = req.body
   
     const task = await taskModel.findById(taskId).populate({
        path: "subTask",
        populate: { path: "subtask"}
    });
    
    if(!task){
    return res.status(403).json({
    message: "Task not found"
    })
  }
  
if (task.userId !== userId) {
    return res.status(403).json({
        message: "Permission denied. You are not the owner of this task."
    });
}

    return res.status(200).json({
    message: "Check track of your task and do good to accomplish it",
    data:task
})
    }catch(err){
        res.status(500).json({
            error: err.message
           })
    }
}

exports.getAlltask = async(req, res)=>{
    try{
        const {userId} = req.user
        const tasks = await taskModel.find({userId}).select(["title", "desc", "subTask"]).populate({
            path: "subTask",
        })
        if(!tasks){
            return res.status(404).json({
                message:'tasks not found'
            })
        }
    if(tasks.length === 0){
    return res.status(203).json({
    message: "unable to get all tasks"
})
}
    return res.status(200).json({
    message: `There are ${tasks.length} tasks present `,
    data: tasks
})
    }catch(err){
        return res.status(500).json({
            error: err.message
           })
    }
}


// exports.deleteSubtask = async(req, res)=>{
//     try{
//    const subTaskId = req.params.subTaskId

//    const subTask = await subTaskModel.findByIdAndDelete(subTaskId)

// if(!subTask){
//     return res.status(404).json({
//         message:"unable to delete subTask"
//     })
// }else{
//     return res.status(200).json({
//         message:" subTask has been successfully deleted",
//         data:subTask
//     })
// }
//     }catch(err){
//         return res.status(500).json({
//             error: err.message
//            })
//     }
// }


