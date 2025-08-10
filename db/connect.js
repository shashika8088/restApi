const mongoose = require('mongoose');

const connectDB = (uri) => {
    console.log('database connected successfully');
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

module.exports = connectDB;