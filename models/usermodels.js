const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type: String,
        required:[true, "Please add user name"]
    },
    email:{
        type: String,
        required:[true, "Please add user email address"],
        unique:[true, "Email already taken"]
    },
    password:{
        type: String,
        required:[true, "Please add user password"]
    },
},{
    timestamps:true,
})

module.exports=mongoose.model("User", userSchema)