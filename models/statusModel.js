const mongoose = require('mongoose')

const statusSchema = new mongoose.Schema({
    statusDesc:{
        type:String,
        require: true
    },
    Tasks:[{
      type: mongoose.SchemaTypes.ObjectId,
        ref:"Task"
    }],
    
    
},{timestamp:true})

const status = mongoose.model("status", statusSchema)
module.exports = status