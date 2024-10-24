const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Secure the password using bcryptjs
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
    console.log(error);
  }
});

// compare the password

userSchema.methods.comparePassword = async function (password) {
  
    return bcrypt.compare(password, this.password);
  
};








// json Webtokens
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        _userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.log(error);
  }
};

// define the model or collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;
