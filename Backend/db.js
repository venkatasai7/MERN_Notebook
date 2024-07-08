const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/iNotebook_Rect";

const connectToMongo = async () => {

        await mongoose.connect(mongoURI);
        console.log("Connection to Mongo successfully");

};

module.exports = connectToMongo;
