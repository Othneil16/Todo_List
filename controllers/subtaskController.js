const subTaskModel = require("../models/subtaskModel.js")
const taskModel = require("../models/taskModel.js")
exports.createsubTask = async (req, res) => {
    try {
        const { taskId, subtask } = req.body;
        const task = await taskModel.findById(taskId);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        const taskSubTask = await subTaskModel.create({
            subtask
        });

        // Associate the subtask with the task
        task.subTask.push(taskSubTask._id);

        // Set the taskId for the subtask
        taskSubTask.taskId = taskId;

        // Save changes to the database
        await taskSubTask.save();
        await task.save();

        // Include the subtask ID in the subtask array
        taskSubTask.subtask.push(taskSubTask._id);
        
        return res.status(200).json({
            message: 'Subtask created successfully',
            data: taskSubTask
        });

    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};



// exports.getSubtask = async(req, res)=>{
//     try{
//      const id = req.body.id
//      const subtask = await subTaskModel.findById(id).populate("Task")
// if(!subtask){
// return res.status(403).json({
//     message: "unable to get oe subtask"
// })
// }
// res.status(200).json({
//     message: "This is the subtask",
//     subtask
// })
//     }catch(err){
//       return  res.status(500).json({
//             error: err.message
//            })
//     }
// }

// exports.getAllSubtask = async(req, res)=>{
//     try{
//         const {taskId} = req.body
//         const task = await taskModel.findById(taskId)
//         if(!task){
//             return res.status(404).json({
//                 message:'task not found'
//             })
//         }
//          const onetask = task.subTask
//         const subtask = await subTaskModel.find().populate("Task")
//     if(subtask.length === 0){
//     return res.status(200).json({
//     message: "unable to get all subtask"
// })
// }
// res.status(200).json({
//     message: "These are the subtasks",
//     subtask
// })
//     }catch(err){
//         res.status(500).json({
//             error: err.message
//            })
//     }
// }

exports.deleteSubtask = async (req, res) => {
    try {
        const { subTaskId } = req.body;
        const subTask = await subTaskModel.findById(subTaskId);

        if (!subTask) {
            return res.status(404).json({
                message: "Subtask not found"
            });
        }

        const taskId = subTask.taskId;

        // Delete the subtask
        const deleteSubTask = await subTaskModel.findByIdAndDelete(subTaskId);

        if (!deleteSubTask) {
            return res.status(404).json({
                message: "Unable to delete subtask"
            });
        }

        // Remove the subtask ID from the corresponding task's subTask array
        const task = await taskModel.findById(taskId);
        if (task) {
            task.subTask.pull(subTaskId);
            await task.save();
        }

        return res.status(200).json({
            message: "Subtask has been successfully deleted"
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};
