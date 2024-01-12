const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const {myValidate} = require('../helpers/validation')
const jwt = require('jsonwebtoken')

exports.signUp = async (req, res)=>{
    try{
       const {firstName, lastName, phoneNumber, email, userPassword, confirmPassword} = req.body
       const lowerCase = email.toLowerCase()
    //    const data ={firstName, lastName, phoneNumber, email, userPassword, confirmPassword }

       await myValidate.validateAsync(req.body,(err,data)=>{
        if (err) {
            res.json(err.message)
        } else {
           res.json(data) 
        }
       }
    )
    
    const checkPassword = confirmPassword === userPassword
    if (!checkPassword) {
       return res.status(404).json({
       message:`incorrect Password, pls type-in a correct password that match`
       })
    } 
       const salt = bcrypt.genSaltSync(10)
       const hashedPassword = bcrypt.hashSync(userPassword,salt)

     
    
       const user = await userModel.create({
        firstName, 
        lastName, 
        phoneNumber, 
        email:lowerCase,
        password: hashedPassword,

       })

      //  const userToken = jwt.sign({
      //   userId:user._id,
      //   email:user.email,
      //   firstName, 
      //   lastName
      //  },
      //  process.env.secret,
      //  {expiresIn:"1week"})

       await user.save()

       res.status(201).json({
        message:`Congratulations!!!, ${email}you have successfully registered`,
        user,
      //   userToken
       })
    }catch(err){
        res.status(500).json({
            error:err.message
        })
    }
}

exports.signIn = async(req, res)=>{
    try{
        const {email, password} = req.body
        const user = await userModel.findOne({email});

        if(!user){
           return res.status(404).json({
                message:'User not found'
            })
        }

        const comparePassword = bcrypt.compareSync(password,user.password);

        if(!comparePassword){
            return res.status(400).json({
                message:'Invalid password'
            })
        };

        const token = jwt.sign({
            userId: user._id,
            email: user.email},
            process.env.secret,{expiresIn:'1d'})

            return res.status(200).json({
                message:'Login Successfully',
                token
               })

        }catch(err){
            res.status(500).json({
             error:err.message
            }) 
         }

    }
    exports.getAllUser = async(req, res)=>{
        try{
            const allUser = await userModel.find()
        if(allUser.length === 0){
        return res.status(200).json({
        message: "unable to get all User"
    })
    }
    res.status(200).json({
        message: "These are the User",
        allUser
    })
        }catch(err){
            res.status(500).json({
                error: err.message
               })
        }
    }


    exports.signOut = async (req, res) => {
        try{
            const userId = req.user.userId;
            const user = await userModel.findById(userId);
    
            const token = req.headers.authorization.split(' ')[1]
    
            if(!user){
                return res.status(404).json({
                    message: 'This user does not exist or is already signed out'
                })
            }
    
             // Revoke token by setting its expiration to a past date
        const decodedToken = jwt.verify(token, process.env.secret);
        decodedToken.exp = 1;
    
        res.status(200).json({
            message: 'You have signed out successfully'
        })
            
            
        }catch(err){
            res.status(500).json({
                message: err.message
            })
        }
    }

    
    