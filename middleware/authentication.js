const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()


exports.authenticate = async (req,res,next)=>{
    try{

        const hasAuthorization = req.headers.authorization

        if(!hasAuthorization){
            return res.status(400).json({
                error:"Authorization token not found"
            })
        }

        const token = hasAuthorization.split(" ")[1]

        if(!token){
            return res.status(400).json({
                error: "Authorization not found"
            })
        }

        const decodeToken = jwt.verify(token, process.env.secret)

        

        const user = await userModel.findById(decodeToken.userId)

        if(!user){
            return res.status(404).json({
                error: "Authorization failed: user not found" 
            })
        }
        
        // const checkToken = user.blackListToken.includes(token);

        // if(checkToken){
        //     return res.status(400).json({
        //         error: "user signed Out"
        //     })
        // }
        req.user = decodeToken;
        next()

    }catch(error){

        if(error instanceof jwt.JsonWebTokenError){
            return res.json({
                message: "session Timeout"
            })
        }

        res.status(500).json({
            error:error.message
        })
    }
}