const bcrypt = require("bcryptjs");
const generateAccessToken = require("../utils/generateAccessToken");
const User = require("../models/user.model");

const login = async(req,res) => {
    try {
        const {email, password} = req.body;

        if(!email.trim() || !password.trim()) {
            return res.status(400).json({message: "Email and password are required"})
        }

        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({message: "User not found"})
        }
        
        if(!bcrypt.compare(password, user.password)) {
            return res.status(401).json({message: "Email or password is incorrect"})
        }

        const token = generateAccessToken(password);
        return res.status(200).json({message: "Login successful", token})
    } catch (err) {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
}

const createUser = async(req,res) => {
    try {
        const {name, email, password, phone} = req.body;

        if(!name.trim() || !email.trim() || !password.trim() || !phone.trim()) {
            return res.status(400).json({message: "All fields are required"})
        }

        const existingUser = await User.findOne({
            $or: [
                { email },
                { phone }
            ]
        });
        if(existingUser) {
            return res.status(400).json({message: "User already exists"})
        }

        const newUser = new User({name, email, password, phone});
        const user = await newUser.save();

        if(user?._id) {
            return res.status(201).json({message: "User created successfully", user })
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
}

module.exports = {login , createUser}