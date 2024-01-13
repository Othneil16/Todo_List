const mongoose = require('mongoose')

const subtaskSchema = new mongoose.Schema({
    subtask:[{
        type: String,
        require: true
    }],
    taskId:{
      type: String,
      require:true
    }
},{timestamp:true})

const userSubTask = mongoose.model("subtask", subtaskSchema)
module.exports = userSubTask