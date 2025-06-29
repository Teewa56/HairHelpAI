const mongoose = require('mongoose')
require('dotenv').config()
const URL = process.env.MONGO_URL

async function connectDB() {
    try {
        await mongoose.connect(URL);
        console.log('DB connected succesfully!');
    } catch (error) {
        console.log("DB error", error);
        process.exit(1);
    }
}

module.exports = connectDB