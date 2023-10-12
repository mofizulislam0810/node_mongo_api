
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  isVerified: Boolean,
  role: String,
  isRemove: Boolean,
  isActivate: Boolean,
  secret: String,
});

const User = mongoose.model('User', userSchema);
export default User;