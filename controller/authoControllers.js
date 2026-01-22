const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../models/User')

exports.register=async(req,res)=>{
    const {name,email,password}=req.body;
    const existingUser=await User.findOne({email})
    if(existingUser){
        res.status(400).json({message:"User already exists"})
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await User.create({
        name,
        email,
        password:hashedPassword
    })
    res.status(201).json({message:"User register successfully"})
}
exports .login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const existingUser=await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const isPasswordValid=await bcrypt.compare(password,existingUser.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token=jwt.sign(
            {id:existingUser._id},
            process.env.JWT_KEY,
            {expiresIn:'1h'})
        res.status(200).json({
            message:"Login Successfully",
            token
        });
    }
    catch(err){
        console.error(err)
        res.status(500).send("Server error")
    }
}