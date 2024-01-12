const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        require: true
    },

    desc:{
        type:String,
        require: true
    },
    status:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"status"
    },
    subTask:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"subtask"
    }]
},{timestamp:true})

const task = mongoose.model("Task", taskSchema)
module.exports = task