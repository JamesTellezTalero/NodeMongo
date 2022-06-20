const mongoose = require('mongoose');
const { mongoURI } = require('../config');

const checkConnection = () => {
    return mongoose.connection.readyState;
};

const connect = async() => {
    try {
        if (!checkConnection()) {
            console.log("connecting database...");
            await mongoose.connect(mongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("connected database successfully!");
        }
    } catch (error) {
        console.error(error)
    }
}

const disconnect = async() => {
    await mongoose.connection.close();
    return checkConnection();
}

module.exports = { checkConnection, connect, disconnect }