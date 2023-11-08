const asyncHandler=require('express-async-handler');
const bcrypt=require('bcrypt')
const User=require('../models/usermodels')
const jwt=require('jsonwebtoken')

const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      return next(new Error("All fields are mandatory"));
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      return next(new Error("User already registered"));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      console.log(`User created: ${newUser}`);
      res.status(201).json({ _id: newUser._id, email: newUser.email });
    } catch (error) {
      res.status(400);
      return next(new Error('User data not valid'));
    }
  });
  

const loginUser=asyncHandler(async(req,res)=>{
    const {email, password}=req.body
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const user=await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken=jwt.sign({
            user:{
                name:user.name,
                email:user.email,
                id:user.id,
            }
        },process.env.ACCESS_TOKEN,
        {expiresIn:"10m"})
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("Email or password is not valid")
    }
})

const currentinfoUser=asyncHandler(async(req,res)=>{
    res.json({message:'Current Info Here'})
})

module.exports={registerUser, loginUser, currentinfoUser}