const mongoose=require("mongoose");
const bcrypt=require('bcryptjs');

const userSchema=mongoose.Schema({
    name:{type:"String",required:true},
    email:{type:"String",required:true,unique:true},
    password:{type:"String",required:true},
    pic:{
        type:"String",
        required:true,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
},
{timestamps:true}
);

//for checking the password
 userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
 }

//ENCREPT PASSWORD FOR NEW USER BEFORE SAVING
userSchema.pre('save',async function(next){
    //If password id not modified go to next
    if(!this.isModified){
        next();
    }
    //else generate new password
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})

const User=mongoose.model("User",userSchema);
module.exports=User;