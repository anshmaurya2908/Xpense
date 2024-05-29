const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    contacts:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
        },
    ],
    history:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'History'
        }
    ]
}, { timestamps: true });
const User = mongoose.model('user', UserSchema);
module.exports = User;