import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  birth: Date,
  password: String,
  photoUrl: String,
  isAdmin: Boolean,
  googleLink: Boolean,
  fridge: Array
});

const User = mongoose.model("User", UserSchema);

export default User;
