const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    user_name: { type: String, required: true, unique: true },
    user_img: { type: String },
    user_email: { type: String, required: true, unique: true },
    user_password: { type: String, minlength: 8, required: true },
    user_phone: { type: Number, required: true, unique: true },
    user_state: { type: Boolean, default: true }
}, {
    collection: "users"
});

const UserModel = model('users', UserSchema);
module.exports = UserModel;