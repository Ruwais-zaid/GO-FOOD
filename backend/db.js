const mongoose = require('mongoose');

const mongoURL = "mongodb://localhost:27017/gofoodmern";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(`MongoDB connection error: ${error}`);
        process.exit(1);
    }
};

module.exports = connectToMongoDB;
