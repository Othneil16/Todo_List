const mongoose = require('mongoose')

const statusSchema = new mongoose.Schema({
    title:{
        type:String,
        require: true
    },
    Task:[{
      type: mongoose.SchemaTypes.ObjectId,
        ref:"Task"
    }],
    // user:{
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref:"User"  
    // }
    
},{timestamp:true})

const status = mongoose.model("status", statusSchema)
module.exports = status