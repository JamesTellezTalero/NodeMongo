require('dotenv').config({ path: "./process.env" });
const jwt = require('jsonwebtoken');
const { GetTablesHelper, CreateUserHelper, UserExistHelper, LoginUserHelper } = require('../helpers/GeneralHelper');

// user_img AGREGAR A UPDATE USER
const CreateUser = async(req, res) => {
    const { user_name, user_email, user_password, user_phone } = req.body;
    const userExits = await UserExistHelper(user_email, user_name);
    if (userExits === false) {
        try {
            //create user and get id
            const userId = await CreateUserHelper(user_name, user_email, user_password, user_phone);
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign({ id: userId, user_name }, process.env.JWT, {
                expiresIn: maxAge
            });
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000
            });
        } catch (error) {
            throw `Error creating user ERROR:${error}`;
        }

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
        const user = await LoginUserHelper(user_name, user_email, user_password);
        if (user.result === true && user.status === true) {
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign({ id: user.user_id, user_name }, process.env.JWT, {
                expiresIn: maxAge
            });
            res.cookie("jwt", token, {
                httpOnly: false,
                maxAge: maxAge * 1000
            });
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

module.exports = {
    CreateUser,
    GetAllUsers,
    LoginUser,
    GetUserById,
}