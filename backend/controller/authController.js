const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const tokenSecret = process.env.TOKEN_SECRET;

const generateToken = (payload) => jwt.sign(payload, tokenSecret, { expiresIn: '1d' });

const signUp = async (req, res) => {
    try {
        const { email, password, userName, fullName, phone } = req.body;
        const isExistingEmail = await User.findOne({ email });
        if (isExistingEmail) return res.status(400).json({ message: 'Email is already used, please sign in' });
        const isExistingUserName = await User.findOne({ userName });
        if (isExistingUserName) return res.status(400).json({ message: 'Username already exists' });
        const hashedPassword = await bcrypt.hash(password, 13);
        const newUser = new User({ email, userName, fullName, phone, password: hashedPassword });
        await newUser.save();
        const auth_token = generateToken({ id: newUser._id });
        res.status(201).json({
            message: 'Account created successfully!',
            auth_token,
            name: fullName
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found, please signup!' });
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) return res.status(400).json({ message: 'Wrong Password' });
        const auth_token = generateToken({ id: user._id });
        res.status(200).json({
            message: 'Login successfully!',
            auth_token,
            name: user.fullName
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { signIn, signUp };