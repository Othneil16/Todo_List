const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        require:true
    },

    lastName:{
        type: String,
        require:true
    }, 

    phoneNumber:{
        type: String,
        require:true
    },
    
    email:{
        type: String,
        require:true
    },

    password:{
        type: String,
        require:true
    },
    task:[{
        type: mongoose.SchemaTypes.ObjectId,
          ref:"Task"
      }],
    // status:[{
    //     type: mongoose.SchemaTypes.ObjectId,
    //       ref:"status"
    //   }]
    
},{timestamp:true})

const userModel = mongoose.model("User", userSchema)
module.exports = userModel