const { GetTablesHelper, CreateUserHelper, UserExistHelper, LoginUserHelper } = require('../helpers/GeneralHelper');
const mongoose = require('mongoose');

// user_img AGREGAR A UPDATE USER
const CreateUser = async(req, res) => {
    const { user_name, user_email, user_password, user_phone } = req.body;
    const userExits = await UserExistHelper(user_email, user_name);
    if (userExits === false) {
        // await CreateUserHelper(user_name, user_email, user_password, user_phone)
        res.status(201).json({
            message: "User was created successfully"
        });
    } else {
        res.status(400).json({ message: "User AllReady Exist" });
    }
}

const LoginUser = async(req, res) => {
    const { user_name, user_email, user_password } = req.body;
    if (!user_name || !user_email || !user_password) {
        res.status(400).json({
            message: "login not successfully",
            error: "check your user name, user email or your password"
        });
    }
    const userExist = await UserExistHelper(user_email, user_name);
    if (userExist === false) {
        res.status(400).json({
            message: "users not exist"
        })
    }
    try {
        const userLogin = await LoginUserHelper(user_name, user_email, user_password);
        (userLogin) ?
        res.status(200).json({
            message: "login succesfull"
        }): res.status(400).json({
            message: "incorrect username, email or password "
        });
    } catch (error) {
        throw `We had error with: username, email or password`;
    }
}

const GetAllUsers = async(req, res) => {
    const allUsers = await GetTablesHelper('users');
    allUsers.find({}, async(err, data) => {
        (err !== null || err !== "") ? console.log(data): console.log(err);
        res.status(200).json({
            data
        });
    });
}

module.exports = {
    CreateUser,
    GetAllUsers,
    LoginUser,
}