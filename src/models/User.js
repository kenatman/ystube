import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userShcema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  socialOnly: { type: Boolean, default: false },
  name: { type: String, required: true },
  location: String,
});

userShcema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userShcema);

export default User;
