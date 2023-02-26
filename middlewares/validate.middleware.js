const {UserModel} = require("../models/User.model");
const validator = async (req,res,next)=>{

    const userData = await UserModel.find({email:req.email});
    if(userData.length){
        
        return res.json({status:"error",message:"user already exist"})
    }else{
        next()
    }
    
    
    
    
    }
    
    module.exports = {
        validator
    }