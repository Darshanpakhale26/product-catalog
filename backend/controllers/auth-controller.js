const User = require("../models/user-model"); // Importing the User Model from the models folder
const bcrypt = require("bcryptjs"); // Importing bcryptjs to hash the password
// Home Logic

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to the Home Page");
  } catch (error) {
    console.log(error);
  }
};

// Registration Logic

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    // Check if the user already exists
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message : "Email Already Exists" });
    }

    // hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User
    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(200).json({
      msg: "User Registered Successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
   // res.status(500).json("Error in Registering User");
    next(error);
  }
};

// Login Logic

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //const user = await bcrypt.compare(password, userExist.password);
    //const isPasswordValid = await userExist.comparePassword(password);

    const user = await userExist.comparePassword(password);



    if (user) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or passord " });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { home, register, login }; // Exporting the controller functions to use in the router
