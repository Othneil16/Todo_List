const mongoose = require('mongoose')

const subtaskSchema = new mongoose.Schema({
    subtask:[{
        type: String,
        require: true
    }],
    task:[{
      type: mongoose.SchemaTypes.ObjectId,
        ref:"Task"
    }]
},{timestamp:true})

const userSubTask = mongoose.model("subtask", subtaskSchema)
module.exports = userSubTask