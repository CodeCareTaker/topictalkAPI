const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImageUrl: { type: String },
  topics: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  posts: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
});

userSchema.pre('save', async function(next) {
  try {
  	if(!this.isModified("password")) {
  	  return next();
  	}
  	let hashedPassword = bcrypt.hash(this.password, 10);
  	this.password = hashedPassword;
  	return next();
  } catch(err) {
  	return next(err);
  }
});

userSchema.methods.comparePassword = async function(candidatePasword, next) {
  try {
  	let isMatch = await bcrypt.compare(candidatePasword, this.password);
  	return isMatch;
  } catch(err) {
  	return next(err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;