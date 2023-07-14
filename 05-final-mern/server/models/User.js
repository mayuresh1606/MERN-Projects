import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:validator.isEmail,
            message:"Please provide valid email"
        },
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:7
    },
    profileImg:{
        type:String,
        default:'string'
    },
    followingList:{
        type:Array,
        default:[],
    },
    followersList:{
        type:Array,
        default:[],
    }
})

userSchema.pre("save", async function(){
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
}

const User = mongoose.model("User", userSchema)
export default User;