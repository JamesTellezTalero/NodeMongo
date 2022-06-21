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
    const userId = bcrypt.hash(user_password, 10).then(async(hash) => {
        const user = new UserModel();
        user.user_name = user_name;
        user.user_email = user_email;
        user.user_password = hash;
        user.user_phone = user_phone;
        await user.save();
        return user._id;
    })
    return userId;
}

const LoginUserHelper = async(user_name, user_email, user_password) => {
    const allUsers = await GetTablesHelper('users');
    const userName = await allUsers.findOne({ user_name: user_name }, null);
    const userEmail = await allUsers.findOne({ user_email: user_email }, null);
    if (!userName) {
        return { status: false };
    } else if (!userEmail) {
        return { status: false };
    } else {
        const result = await bcrypt.compare(user_password, userEmail.user_password);
        return { result, status: true, user_id: userEmail._id };
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
    LoginUserHelper,
}