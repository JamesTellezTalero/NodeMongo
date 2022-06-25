require('dotenv').config({ path: "./process.env" });
const { validationResult } = require('express-validator');
const { response, request } = require('express');
const { GetTablesHelper, CreateUserHelper, LoginUserHelper } = require('../helpers/GeneralHelper');
const { all } = require('../routes');

// user_img AGREGAR A UPDATE USER
const CreateUser = async(req, res) => {
    const { user_name, user_email, user_password, user_phone } = req.body;
    try {
        //create user and get id
        const userId = await CreateUserHelper(user_name, user_email, user_password, user_phone);
        res.status(201).json({
            message: "User was created successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: `Error creating user.`,
            Error: `${error}`
        });
        throw `Error creating user ERROR:${error}`;
    }
}

const UpdateUserByEmail = async(req, res) => {
    const { id, user_name, user_email, user_phone } = req.body;
    try {
        const allUsers = await GetTablesHelper("users");
        const user = await allUsers.findByIdAndUpdate(id, { user_name, user_email, user_phone });
        console.log(user);
        res.status(201).json({
            message: "User was updating successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: `Error updating user.`,
            Error: `${error}`
        });
        throw `Error creating user ERROR:${error}`;
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
    try {
        const user = await LoginUserHelper(user_name, user_email, user_password);
        if (user.result === true && user.status === true) {
            res.status(200).json({
                message: "login succesfull"
            })
        } else {
            res.status(400).json({
                message: "incorrect username, email or password "
            });
        }
    } catch (error) {
        throw `We had error with: ${error}`;
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

const GetUserById = async(req, res) => {
    const { id } = req.body
    const allUsers = await GetTablesHelper('users');
    const user = await allUsers.findOne({ _id: id });
    res.status(200).json({
        user
    });
}
const GetUserByEmail = async(req, res) => {
    const user_email = req.query.user_email;
    const allUsers = await GetTablesHelper('users');
    const user = await allUsers.findOne({ user_email });
    res.status(200).json({
        user
    });
}

module.exports = {
    CreateUser,
    UpdateUserByEmail,
    LoginUser,
    GetAllUsers,
    GetUserById,
    GetUserByEmail,
}