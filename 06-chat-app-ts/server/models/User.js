import mongoose from "mongoose";
import bcryptjs from "bcryptjs"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

UserSchema.pre("save", async function(){
    if (!this.isModified("password")) return;
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
})

UserSchema.methods.updatePassword = async function (candidatePassword){
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(candidatePassword, salt);

    await this.save();
}

UserSchema.methods.comparePassword = async function (candidatePassword){
    console.log('candidatePassword', candidatePassword)
    console.log('this.password', this.password)
    const isMatch = await bcryptjs.compare(candidatePassword, this.password);
    console.log(isMatch);
    return isMatch;
}

const User = mongoose.model("User", UserSchema);


export default User;