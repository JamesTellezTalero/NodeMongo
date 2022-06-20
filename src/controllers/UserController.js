const {
    UserModel,
    ProjectModel,
    TaskModel,
    SubTaskModel
} = require('../models/GeneralModel');

const mongoose = require('mongoose');

// user_img AGREGAR A UPDATE USER

const CreateUser = async(req, res) => {
    const { user_name, user_email, user_password, user_phone } = req.body;

    const newUser = new UserModel();
    newUser.user_name = user_name;
    newUser.user_email = user_email;
    newUser.user_password = user_password;
    newUser.user_phone = user_phone;
    const response = await newUser.save();

    res.json({
        message: "User was created successfully"
    });
}

const GetAllUsers = async(req, res) => {

    const allUsers = mongoose.model('users')
    allUsers.find({}, async(err, data) => {
        (err !== null || err !== "") ? console.log(data, data.length): console.log(err);
        res.json({
            data
        });
    });

}

module.exports = {
    CreateUser,
    GetAllUsers,

}