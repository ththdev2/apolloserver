import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  photoUrl: String,
  isAdmin: Boolean,
  social: String,
  fridge: Array
});

const User = mongoose.model("User", UserSchema);

export default User;
