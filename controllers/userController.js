const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const {myValidate} = require('../helpers/validation')
const jwt = require('jsonwebtoken')

exports.signUp = async (req, res)=>{
    try{
       const {firstname, lastname, phoneNumber, email, userPassword, confirmPassword} = req.body
      
       await myValidate.validateAsync(req.body,(err,data)=>{
        if (err) {
           return res.json(err.message)
        } else {
            return  res.json(data) 
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

     
    
       const user = await new userModel({
        firstName:firstname.toUpperCase(),
        lastName:lastname.toUpperCase(),
        phoneNumber, 
        email: email.toUpperCase(),
        password: hashedPassword,

       })

    
       await user.save()

       return res.status(201).json({
        message: `Congratulations!!!, ${firstname.charAt(0).toUpperCase()}${firstname.slice(1)}.${lastname.slice(0, 1).toUpperCase()} you are successfully registered`,
        data: user,
    
       })
    }catch(err){
        return res.status(500).json({
            error:err.message
        })
    }
}

exports.signIn = async(req, res)=>{
    try{
        const {email, password} = req.body
        const user = await userModel.findOne({email:email.toUpperCase()});

        if(!user){
           return res.status(404).json({
                message:'User not found'
            })
        }

        const comparePassword = bcrypt.compareSync(password,user.password);

        if(!comparePassword){
            return res.status(400).json({
                message:`Invalid password, please type-in a correct password`
            })
        };

        const token = jwt.sign({
            userId: user._id,
            email: user.email},
            process.env.secret,{expiresIn:'1d'})

            return res.status(200).json({
                message: `Welcome on board ${user.firstName.charAt(0).toUpperCase()}${user.firstName.slice(1)}.${user.lastName.slice(0, 1).toUpperCase()}, Feel free to create a task of your choice`,
                data:token
               })

        }catch(err){
            return res.status(500).json({
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
    return res.status(200).json({
        message: "These are the User",
        data:allUser
    })
        }catch(err){
           return res.status(500).json({
                error: err.message
               })
        }
    }


    exports.signOut = async (req, res) => {
        try{
            const {userId} = req.user
            const {token} = req.user
            const user = await userModel.findById(userId);

        if(!user){
                return res.status(404).json({
                    message: 'This user not found'
                })
            }
        
             if (!user.token) {
                return res.status(400).json({
                    message: 'User does not have a valid token'
                });
            }
           // Revoke token by setting its expiration to a past date
           const decodedToken = jwt.verify(user.token, process.env.secret);
           decodedToken.exp = 1;
    
       return res.status(200).json({
            message: 'You have signed out successfully'
        })
            
            
        }catch(err){
            return res.status(500).json({
                message: err.message
            })
        }
    }

    
    
// exports.logOut = async (req, res) => {
//     try {
//         const {userId}= req.user
//         const user = await userModel.findById(id);

//         if (!user) {
//             return res.status(404).json({
//                 message: `User not found`
//             });
//         }

//         // Invalidate the user's token and add it to the user.Model.blacklist
//         const userToken = req.user.token;
//         userModel.blackListToken.push(userToken);
            
//         await userModel.save()
        
//         return res.status(200).json({
//             message: "Sign-out successful"
//         });

//     } catch (error) {
//         return res.json({
//             error: error.message,
//             message: "Error occurred while logging out",
//         });
//     }
// };


