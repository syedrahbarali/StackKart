const bcrypt = require("bcryptjs");
const generateAccessToken = require("../utils/generateAccessToken");
const User = require("../models/user.model");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    let user = await User.findOne({ email: email.toLowerCase() }).populate({
      path: "cart",
      populate: {
        path: "product",
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    const token = generateAccessToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    user = user.toObject();
    delete user.password;

    res.cookie("token", token, { httpOnly: true });
    return res
      .status(200)
      .json({ message: "Login successful", token, user, ok: true });
  } catch (err) {
    //console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

const findUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).populate({
      path: "cart",
      populate: {
        path: "product",
      },
    });
    return res.status(200).json({ message: "User found", user, ok: true });
  } catch (err) {
    //console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, isAdmin = false } = req.body;

    if (!name.trim() || !email.trim() || !password.trim() || !phone.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: encryptedPassword,
      phone,
      isAdmin,
    });
    const user = await newUser.save();

    if (user?._id) {
      return res
        .status(201)
        .json({ message: "User created successfully", ok: true });
    }
  } catch (err) {
    //console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful", ok: true });
  } catch (err) {
    //console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { login, findUser, createUser, logout };
