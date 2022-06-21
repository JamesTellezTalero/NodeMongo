const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {
    UserModel,
    ProjectModel,
    TaskModel,
    SubTaskModel
} = require('../models/GeneralModel');
const res = require('express/lib/response');

const GetTablesHelper = async(table) => {
    try {
        const tableInfo = await mongoose.model(table)
        return tableInfo;
    } catch (error) {
        throw error;
    }
}

const CreateUserHelper = async(user_name, user_email, user_password, user_phone) => {
    try {
        bcrypt.hash(user_password, 10).then(async(hash) => {
            const newUser = new UserModel();
            newUser.user_name = user_name;
            newUser.user_email = user_email;
            newUser.user_password = hash;
            newUser.user_phone = user_phone;
            const response = await newUser.save();
        })
    } catch (error) {
        throw `Error creating user ERROR:${error}`;
    }
}

const LoginUserHelper = async(user_name, user_email, user_password) => {
    const allUsers = await GetTablesHelper('users');
    const userName = await allUsers.findOne({ user_name: user_name }, null);
    const userEmail = await allUsers.findOne({ user_email: user_email }, null);
    if (!userName) {
        return false;
    } else if (!userEmail) {
        return false;
    } else {
        const result = await bcrypt.compare(user_password, user.user_password);
        return result;
    }
}

const UserExistHelper = async(user_email, user_name) => {
    const allUsers = await GetTablesHelper('users');
    const currentUserName = await allUsers.findOne({ user_name: user_name }, null);
    const currentUserEmail = await allUsers.findOne({ user_email: user_email }, null);
    if (currentUserName !== null) {
        return true;
    } else if (currentUserEmail !== null) {
        return true;
    } else {
        return false;
    }
}


module.exports = {
    GetTablesHelper,
    CreateUserHelper,
    UserExistHelper,
    LoginUserHelper
}