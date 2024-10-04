import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
   username:{
    type: String,
    unique: true,
    required: [true, 'Please enter your name']
   },
   email: {
    type: String,
    unique: true,
    required: [true, 'Please enter your email']
   },
   password:{
    type: String,
    unique: true,
    required: [true, 'Please enter your password']
   },
   isVerified:{
    type: Boolean,
    default: false
   }
})

// const User = mongoose.models.users || mongoose.model("Users", userSchema);
// const User = mongoose.model("Users", userSchema);
let User: any;

try {
  User = model("User");
} catch {
  User = model("User", userSchema);
}
// const User = models.User || model("User", userSchema);

// export default User;

export default User;