const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    user_name: { type: String, required: true },
    user_img: { type: String },
    user_email: { type: String, required: true },
    user_password: { type: String, minlength: 8, required: true },
    user_phone: { type: Number, required: true }
}, {
    collection: "users"
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;