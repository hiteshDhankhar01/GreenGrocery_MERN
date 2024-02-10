const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userScema");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config()

const gernateToken = user => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY,
        { expiresIn: '5d' })
}

const register = async (req, res) => {
    // res.status(200).json({message:"run bro"})
    const { name, email, password, photo } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        let createUser = new User({
            name,
            email,
            password: hashPassword,
            photo
        });
        await createUser.save();

        user = createUser.toObject()
        delete user.password

        const token = gernateToken(createUser)
        res.status(200).json({ message: "Registration successful", user, token });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Please fill correct details" })
        }

        user = user.toObject()
        delete user.password
        const token = gernateToken(user)

        res.status(200).json({ message: "Login successfull", user, token })
    } catch (error) {
        res.status(400).json({ message: "Internal server error" })
        console.log(error)
    }
}

module.exports = { register, login };

