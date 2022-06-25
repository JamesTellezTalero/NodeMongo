const { CreateUser, UpdateUserByEmail, LoginUser, GetAllUsers, GetUserById, GetUserByEmail } = require('./UserController');

module.exports = {
    CreateUser,
    GetAllUsers,
    LoginUser,
    GetUserById,
    GetUserByEmail,
    UpdateUserByEmail
}